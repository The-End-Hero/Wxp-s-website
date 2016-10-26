$(function () {
    //get获取图片数据
    $.getJSON('./loopPic.php', function (data) {
        console.log(data)
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
                'transform':'translateX('+index*-10+'rem)'
            },400,'ease', function () {
                //animate回调函数,结束时候执行
                if(index>=6){
                    index=1;
                    //
                    loopUl.css({
                        'transform':'translateX('+index*-10+'rem)'
                    })
                }else if(index<=0){
                    index=5
                    loopUl.css({
                        'transform':'translateX('+index*-10+'rem)'
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
            console.log('aaaa')
            autoMove()
        },1000)
        //手指滑动事件
        $('#loop-pic').on('swipeLeft', function () {
            clearInterval(timerId)
            timerId=undefined
            index++
            autoMove()
        })
        $('#loop-pic').on('swipeRight', function () {
            clearInterval(timerId)
            timerId=undefined
            index--
            autoMove()
        })

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



})