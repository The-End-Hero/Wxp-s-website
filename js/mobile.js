$(function () {
    //get获取图片数据
    $.getJSON('./loopPic.php', function (data) {
        //console.log(data)
        var str=template('loop',{list:data})
        $('#loop-pic').html(str);
        loop()
    })
    function loop(){
        //轮播图开始
        //轮播图的ul
        var loopUl=$('#loopUl')
        //轮播图索引的ul
        var indexUl=$('#indexUl')
        indexUl.children('li').eq(0).addClass('black')
        //屏幕的宽度,因为rem布局所以10rem就是100%宽度
        //var loopWidth=$('#loop-pic').width();
        //使用定时器实现无限轮播
        var index=1;
        //transform实现动画
        var autoMove= function () {
            //console.log('b')
            loopUl.animate({
                'transform':'translateX('+index*-10+'rem)',
                'webkitTransform':'translateX('+index*-10+'rem)'
            },400,'ease', function () {
                //animate回调函数,结束时候执行
                if(index>=6){
                    index=1;
                    //
                    loopUl.css({
                        'transform':'translateX('+index*-10+'rem)',
                        'webkitTransform':'translateX('+index*-10+'rem)'
                    })
                }else if(index<=0){
                    index=5
                    loopUl.css({
                        'transform':'translateX('+index*-10+'rem)',
                        'webkitTransform':'translateX('+index*-10+'rem)'
                    })
                }
                //改变索引ul
                indexUl.children('li').removeClass('black').eq(index-1).addClass('black')

                if(timerId==undefined){
                    timerId=setInterval(function () {
                        index++;
                        autoMove()
                    },1000)
                }
            })
        }
        //开启定时器
        var timerId=setInterval(function () {
            index++
            //console.log('aaaa')
            autoMove()
        },1000)
        //手指滑动事件
        $('#loop-pic').on('swipeLeft', function (e) {
            //console.log(e)
            e.preventDefault();
            clearInterval(timerId)
            timerId=undefined
            index++
            autoMove()
        })
        $('#loop-pic').on('swipeRight', function (e) {
            e.preventDefault();
            clearInterval(timerId)
            timerId=undefined
            index--
            autoMove()
        })
        $('#loop-pic').on('touchstart', function (e) {
            e.preventDefault();
        })
        $('#loop-pic').on('touchmove', function (e) {
            e.preventDefault();
        })
        //$('#loop-pic').on('touchend', function (e) {
        //    e.preventDefault();
        //})

    }
    top()
    function top(){
        var top=document.querySelector('.top')
        top.style.backgroundColor='rgba(0,0,0,0)'
        //轮播图高度
        var loopH=document.querySelector('#loop-pic').offsetHeight
        window.onscroll= function (e) {
            var percent=window.document.body.scrollTop/loopH

            if(percent>1){
                percent=1
            }
            top.style.backgroundColor='rgba(0,0,0,'+percent+')'
        }
    }
    
    
    $.getJSON('./info/mobile_1.json', function (data) {
        //console.log(data[0].ifm)
        var str=template('ifm',{list:data})
        $('.ajax-8').html(str)
    })
    //注册事件
    var navs=document.querySelectorAll('.pic>div')
    for(var i=0;i<navs.length;i++){

        $(navs[i]).on('touchend', function (e) {
            //console.log(e.changedTouches[0])
            var page_X=e.changedTouches[0].pageX//鼠标所在位置X
            var page_Y=e.changedTouches[0].pageY//鼠标所在位置Y
            var offset_left=$(this).offset().left//外盒子在浏览器中的位置
            var offset_top=$(this).offset().top//外盒子在浏览器中的位置

            //水波纹效果
            var span=$('<span class="water"></span>').appendTo($(this))
            $(span).hide()
            //console.log($(span).height())
            if((page_X-offset_left)>0&&(page_X-offset_left)<$(this).width()&&(page_Y-offset_top)>0&&(page_Y-offset_top)<$(this).height()){

                $(span).css({
                    left:(page_X- offset_left)-40+'px',
                    top:(page_Y- offset_top)-40+'px',
                })
                $(span).fadeIn()
                $(span).addClass('animated zoomIn')
                //$(span).css({
                //    opacity:'0.4'
                //})
                setTimeout(function () {
                    $(span).hide()
                    $(span).remove()
                    //$(span).removeClass('animated zoomIn')
                },400)
                //setTimeout(function () {
                //    $(span).remove()
                //},800)
            }
            changeTab($(this).index()+1)
            //.index()天坑啊,如果是选择器是返回相对兄弟元素的位置,如果是dom元素集合是返回第一个元素的位置.....
        })
    }
    var changeTab= function (n) {
        $.getJSON('./info/mobile_'+n+'.json', function (data) {
            //console.log(data)
            var str=template('ifm',{list:data})
            $('.ajax-8').html(str)
        })
    }



})