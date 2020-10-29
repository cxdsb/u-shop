function you() {
    // 兼容
    function get(elem, attr) {
        if (window.getComputedStyle) {
            return getComputedStyle(elem)[attr];
        } else {
            return elem.currentStyle[attr];
        }
    }
    // 移动事件
    function move(elem, attr, jia, hou) {

        // 清除定时器
        clearInterval(elem.timer);
        // 开启一个定时器
        var corrent = parseFloat(get(elem, attr));
        jia = corrent < hou ? jia : -jia;
        elem.timer = setInterval(function () {
            // 获取当前div的left值
            corrent = parseFloat(get(elem, attr));
            // 让滑块一步步移动到1000的位置  改变left属性 0+10+20-------1000
            var end = corrent + jia;

            if ((end >= hou && jia > 0) || (end <= hou && jia < 0)) {
                clearInterval(elem.timer);
                end = hou;
            }
            elem.style[attr] = end + 'px';
        }, 20)
    }
    // 多属性同时改变
    function moveduo(elem, obj, fn) {

        // 清除定时器
        // 判断元素属性是否为透明色，如果是需要透明度的值就需要*100
        for (var attr in obj) {
            // attr: 属性名  obj[attr]: 属性值
            if (attr == 'opacity') {
                obj[attr] = obj[attr] * 100;
            }
        }

        clearInterval(elem.timer);
        // 开启一个定时器
        elem.timer = setInterval(function () {
            var flag = true;
            // 当一个目标值达到后就会停止，所以假设一开始的时候所有的状态已经都达到目标值
            //  每次都基于当前的left
            // 判断元素属性是否为透明色
            for (var attr in obj) {
                // 定时器每一次执行的过程中,每个属性都要基于上一次的样式改变
                if (attr == 'opacity') {
                    var corrent = parseFloat(you.get(elem, attr)) * 100;
                } else {
                    var corrent = parseFloat(get(elem, attr));
                }

                // 速度 = 距离 / 时间(20);  时间一定的情况下, 速度想要越来越小, 那么距离就要越来越小           
                var speed = (obj[attr] - corrent) / 20;

                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                var end = corrent + speed;
                // 移动到1000的时候停止
                // if ((end >= hou && speed > 0) || (end <= hou && speed < 0)) {
                //     clearInterval(elem.timer);
                //     end = hou;
                // }
                // 如果结束值不等于目标值，flag就不能为true
                if (end != obj[attr]) {
                    flag = false;
                }
                // 判断元素属性是否为透明色，是就改单位
                if (attr == 'opacity') {
                    elem.style[attr] = (end / 100);
                } else {
                    elem.style[attr] = end + 'px';
                }
            }
            // 判断flag, 如果flag是true, 代表所有状态已经达到目标值
            if (flag) {
                clearInterval(elem.timer);
                // 如果一个函数存在，就调用这个函数  &&
                // if(fn){
                //     fn();
                // }
                fn && fn();
            }
        }, 20)
    }


    // 缓冲事件+透明度
    function movehuan(elem, attr, hou) {

        // 清除定时器
        // 判断元素属性是否为透明色，如果是需要透明度的值就需要*100
        if (attr == 'opacity') {
            hou = hou * 100;
        }
        clearInterval(elem.timer);
        // 开启一个定时器
        elem.timer = setInterval(function () {
            //  每次都基于当前的left
            // 判断元素属性是否为透明色
            if (attr == 'opacity') {
                var corrent = parseFloat(you.get(elem, attr)) * 100;
            } else {
                var corrent = parseFloat(get(elem, attr));
            }

            // 速度 = 距离 / 时间(20);  时间一定的情况下, 速度想要越来越小, 那么距离就要越来越小           
            var speed = (hou - corrent) / 20;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            var end = corrent + speed;
            // 移动到1000的时候停止
            // if ((end >= hou && speed > 0) || (end <= hou && speed < 0)) {
            //     clearInterval(elem.timer);
            //     end = hou;
            // }
            if (end == hou) {
                clearInterval(elem.timer);
                end = hou;
            }
            // 判断元素属性是否为透明色，改单位
            if (attr == 'opacity') {
                elem.style[attr] = (end / 100);
            } else {
                elem.style[attr] = end + 'px';
            }

        }, 20)
    }
    // 移除事件绑定
    function removeevent(elem, type, fn) {
        // elem: 元素
        // type: 事件类型
        // fn: 事件处理函数
        if (elem.detachEvent) {
            // ie
            elem.attachEvent('on' + type, fn);
        } else {
            // 标准
            elem.removeEventListener(type, fn, false)
        }
    }


    // 添加事件函数
    function getadd(elem, type, fn) {

        if (elem.attachEvent) {
            elem.attachEvent('on' + type, fn);
        } else {
            elem.addEventListener(type, fn, false);
        }
    }

    // 元素拖拽
    function tuo(elem) {
        elem.onmousedown = function (ev) {
            // 鼠标按下的时候，求出鼠标距离元素左侧的距离及鼠标距离元素上面的距离
            var evs = event || ev;
            // 鼠标距离页面左侧或顶部距离
            var el = evs.clientX;
            var et = evs.clientY;
            // 元素距离页面左侧或顶部距离
            //    console.log(elem.offsetLeft);
            var mdleft = el - elem.offsetLeft;//鼠标距离元素左侧的距离
            var mdtop = el - elem.offsetTop;//鼠标距离元素上面的距离
            // 求得屏幕宽高
            var cw = document.documentElement.clientWidth;
            var ch = document.documentElement.clientHeight;
            var boxW = elem.offsetWidth;
            var boxH = elem.offsetHeight;
            // 求最大边界值
            var maxW = cw - boxW;
            var maxH = ch - boxH;
            // 给元素添加移动事件----> 整个页面移动鼠标
            document.onmousemove = function (ev) {
                var evs = event || ev;
                // 鼠标点击元素移动的距离
                // console.log(evs.clientX);
                var l = evs.clientX - mdleft;
                var t = evs.clientY - mdtop;
                if (l <= 0) {
                    l = 0;
                }
                if (l >= maxW) {
                    l = maxW;
                }
                if (t <= 0) {
                    t = 0;
                }
                if (t >= maxH) {
                    t = maxH;
                }
                elem.style.left = l + 'px';
                elem.style.top = t + 'px';
                // 设置全局捕获
                if (elem.setCapture) {
                    elem.setCapture();
                }
                // 阻止默认事件
                return false;
            }
        }
        // 抬起的时候，释放元素的事件
        document.onmouseup = function () {
            // 释放全局捕获
            if (elem.releaseCapture) {
                elem.releaseCapture();
            }
            document.onmousemove = null;
        }
    }

    /* 
                请求方式: type 非必传，默认get
                请求地址: url 必传
                是否异步: async 非必传
                设置头请求: contentType 非必传
                请求数据: data 非必传
            */
    //    ajax封装
    function ajax(json) {
        json.type = json.type ? json.type : 'get';

        json.async = json.async == false ? false : true;

        json.contentType = json.contentType ? json.contentType : 'application/x-www-form-urlencoded';
        json.date = json.date ? json.date : '';

        var ajax = new XMLHttpRequest();

        // 判断get还是post
        if (json.type.toLowerCase() == 'post') {
            ajax.open('post', json.url, json.async);
            ajax.setRequestHeader('Content-type', json.contentType + ';charset=utf-8');
            ajax.send(json.date);
        } else {
            ajax.open('get', json.url + '?' + json.date, json.async);
            ajax.send();
        }
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                json.success(ajax.response);
            }
        }
    }
    // 切换分类
    function qiehuan(elem, elem2) {
        for (var j = 0; j < elem.length; j++) {
            elem[j].index = j;
            elem[j].onmouseenter = function () {
                for (var z = 0; z < elem.length; z++) {
                    elem2[z].style.display = 'none';
                }
                elem2[this.index].style.display = 'block';
            }
        }
    }
    return {
        'get': get,
        'move': move,
        'removeevent': removeevent,
        'getadd': getadd,
        'tuo': tuo,
        'movehuan': movehuan,
        'moveduo': moveduo,
        'ajax': ajax,
        'qiehuan': qiehuan
    };
}
var you = you(); 