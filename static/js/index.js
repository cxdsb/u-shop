window.onload = function(){
    // 当页面距离顶部大于500排序，点击可回顶
    var backTop = document.getElementsByClassName('backTop')[0];
    var backTopImg = backTop.getElementsByTagName('img')[0];

    var x = 0;
    window.onscroll = function () {
        x = document.documentElement.scrollTop;
        if (x >= 500) {
            backTop.style.display = 'block';
        } else {
            backTop.style.display = 'none';
        }
    }
    // console.log(backTopImg.src);
    var backTop_flag = true;
    backTop.onmouseenter = function () {
        if (backTop_flag == true) {
            backTopImg.src = 'images/backTopfalse.png'
            backTop_flag = false;
        } else {
            backTopImg.src = 'images/backToptrue.png';

            backTop_flag = true;
        }
    }
    var t = null;
    backTop.onclick = function () {
        t = setInterval(function () {
            x -= 10;

            if (x <= 0) {
                clearInterval(t);
            }
            document.documentElement.scrollTop = x;
        }, 1)
    } 
}