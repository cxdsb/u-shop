$.ajax({
    'url': '/bannerList',
    'type':'get',
    'success': function (res) {
        var r = $(res)[0].list;
        // console.log(r)
        // console.log(r[0].coverimg)
        var banarr = ['#2c6abf','#b34bf6','#895df8','#2c6abf','#2c6abf','#2c6abf','#2c6abf'];
        // var banarr = new Array("#2c6abf", "#b34bf6", "#895df8", "#2c6abf", "#2c6abf", "#2c6abf", "#2c6abf");
    var ul = $('.ck-slide-wrapper');
    var ul1 = $('.dot-wrap');
    var str = '';
    var cstr = '';
   
    
    $.each(r, function (index, value) {
        // console.log(index, value.coverimg)
        str += '<li><img src="' + value.coverimg + '" alt="" width="830" height="482"></li>';
        cstr += '<li><em></em></li>';
   
        // console.log(str);
        // str.appendTo(ul);
        $(ul).html(str);
        $(ul1).html(cstr);
        // cstr.appendTo(ul1);
        
    });
    // // 无缝轮播： 让ul的最后再多加一张第一张图
    $('<li><img src="' + r[0].coverimg + '" alt=""></li>').appendTo(ul);

    $(ul).css('width', '' + (r.length + 1) * 830 + 'px');
    $('.banner-1').css('background', ''+ banarr[0] + '')
    // // 变量存储当前是第几张
    var n = 0;
    var timer = setInterval(imgmove, 2000);
    function imgmove() {
        n++;
        
        if (n >= r.length + 1) {
            // console.log(n)
            $(ul).css('left', '0');
            n = 1;
        }
        if (n < 0) {
            n = r.length - 1;
        }
        $(ul).finish().animate({
            left: -n * 830
        })
        
        // 排他
        $(lis).removeClass('active');


        // 最后一个n需要选中0
        $(lis).eq(n == r.length ? 0 : n).attr('class', 'active')
$('.banner-1').css('background', ''+ banarr[n] + '');
    }

    var lis = $(ul1).children();
    
    $(lis).eq(0).addClass('active');
    // console.log(lis);
    $.each($(lis), function (index, value) {
        // console.log(index,value)
        $(value).click(function () {
            n = index - 1;
            imgmove();
            $(value).attr('class', 'active');
            $(value).prevAll().removeClass('active');
            $(value).nextAll().removeClass('active');

        });


    });
    $('.ck-slide').mouseenter(function () {
        clearInterval(timer);
    });

    $('.ck-slide').mouseleave(function () {
        timer = setInterval(imgmove, 2000);
    });

    $('.ck-slide a').eq(0).click(function () {
        n -= 2;
        imgmove();
        // console.log(n);
    });
    $('.ck-slide a').eq(1).click(function () {
        imgmove();
        // console.log(n)
    })


    },

});




