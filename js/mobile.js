$(function () {
    //get获取图片数据
    $.getJSON('./loopPic.php', function (data) {
        //console.log(data)
        var str = template('loop', {list: data})
        $('#loop-pic').html(str);
        loop()
    })
    //function loop() {
    //    //轮播图开始
    //    //轮播图的ul
    //    var loopUl = $('#loopUl')
    //    //轮播图索引的ul
    //    var indexUl = $('#indexUl')
    //    indexUl.children('li').eq(0).addClass('black')
    //    //屏幕的宽度,因为rem布局所以10rem就是100%宽度,可能存在兼容性问题
    //    var loopWidth=$('#loop-pic').width();
    //    //使用定时器实现无限轮播
    //    var index = 1;
    //    //transform实现动画
    //    var autoMove = function () {
    //        //console.log('b')
    //        loopUl.animate({
    //            'transform': 'translateX(' + index * -10 + 'rem)',
    //            'webkitTransform': 'translateX(' + index * -10 + 'rem)'
    //        }, 400, 'ease', function () {
    //            //animate回调函数,结束时候执行
    //            if (index >= 6) {
    //                index = 1;
    //                //
    //                loopUl.css({
    //                    'transform': 'translateX(' + index * -10 + 'rem)',
    //                    'webkitTransform': 'translateX(' + index * -10 + 'rem)'
    //                })
    //            } else if (index <= 0) {
    //                index = 5
    //                loopUl.css({
    //                    'transform': 'translateX(' + index * -10 + 'rem)',
    //                    'webkitTransform': 'translateX(' + index * -10 + 'rem)'
    //                })
    //            }
    //            //改变索引ul
    //            indexUl.children('li').removeClass('black').eq(index - 1).addClass('black')
    //
    //            if (timerId == undefined) {
    //                timerId = setInterval(function () {
    //                    index++;
    //                    autoMove()
    //                }, 1000)
    //            }
    //        })
    //    }
    //    //开启定时器
    //    var timerId = setInterval(function () {
    //        index++
    //        //console.log('aaaa')
    //        autoMove()
    //    }, 1000)
    //    //手指滑动事件
    //    $('#loop-pic').on('swipeLeft', function (e) {
    //        //console.log(e)
    //        //e.preventDefault();
    //        //if(deltaX>$('#loop-pic').width()/5){
    //            clearInterval(timerId)
    //            timerId = undefined
    //            index++
    //            autoMove()
    //        //}
    //
    //    })
    //    $('#loop-pic').on('swipeRight', function (e) {
    //        //e.preventDefault();
    //        //if(deltaX>$('#loop-pic').width()/5){
    //            clearInterval(timerId)
    //            timerId = undefined
    //            index--
    //            autoMove()
    //        //}
    //    })
    //    //var ul
    //    //var startX = 0;
    //    //var moveX =0;
    //    //var distanceX = 0;
    //    $('#loop-pic').on('touchstart', function (e) {
    //        e.preventDefault();
    //        //var touch = e.touches[0];
    //        //return startPosition=touch.pageX
    //            //y: touch.pageY
    //
    //        //startX= e.touches[0].clientX
    //    })
    //    $('#loop-pic').on('touchmove', function (e) {
    //        e.preventDefault();
    //        //moveX = e.touches[0].clientX - startX;
    //    })
    //    //$('#loop-pic').on('touchend', function (e) {
    //    //    e.preventDefault();
    //        //var touch = e.touches[0];
    //        //return endPosition = touch.pageX
    //
    //    //})
    //    //var deltaX = Math.abs(endPosition - startPosition);
    //    //deltaY = endPosition.y - startPosition.y;
    //    //moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
    //}

    //轮播图(带吸附效果)
    function loop() {
        var loopUl = $('#loopUl')
        //轮播图索引的ul
        var indexUl = $('#indexUl')
        indexUl.children('li').eq(0).addClass('black')
        //屏幕的宽度,因为rem布局所以10rem就是100%宽度,可能存在兼容性问题
        var loopWidth = $('#loop-pic').width();
        //使用定时器实现无限轮播
        var index = 1;
        //自动轮播方法
        var autoMove = function () {
            console.log('b')
            loopUl.animate({
                'transform': 'translate3d(' + index * -loopWidth + 'px,0,0)',
                //'webkitTransform': 'translateX(' + index * -loopWidth + 'px)'
            }, 400, 'ease', function () {
                //animate回调函数,结束时候执行
                if (index >= 6) {
                    index = 1;
                    //
                    loopUl.css({
                        'transform': 'translate3d(' + index * -loopWidth + 'px,0,0)',
                        //'webkitTransform': 'translateX(' + index * -loopWidth + 'px)'
                    })
                } else if (index <= 0) {
                    index = 5
                    loopUl.css({
                        'transform': 'translate3d(' + index * -loopWidth + 'px,0,0)',
                        //'webkitTransform': 'translateX(' + index * -loopWidth + 'px)'
                    })
                }
                //改变索引ul
                indexUl.children('li').removeClass('black').eq(index - 1).addClass('black')

                if (timerId == undefined) {
                    timerId = setInterval(function () {
                        index++;
                        autoMove()
                    }, 2000)
                }
            })
        }
        //开启定时器
        var timerId = setInterval(function () {
            index++
            //console.log('aaaa')
            autoMove()
        }, 2000)

        //touch事件
        var startX
        var moveX
        $('#loop-pic').on('touchstart', function (e) {
            e.preventDefault();
            var touch = e.touches[0];
            startX= touch.clientX
            //console.log(startX)
            clearInterval(timerId)
            timerId=undefined

        })
        $('#loop-pic')[0].addEventListener('touchmove', function (e) {
            e.preventDefault();
            var touch = e.touches[0];
            moveX =touch.clientX - startX;
            //console.log(moveX)
            //clearInterval(timerId)
            //timerId=undefined
            //console.log(index * -loopWidth)
            //console.log(index * -loopWidth+moveX)
            var follow=index * -loopWidth+moveX
            loopUl.css({
                'transform': 'translate3d(' + follow + 'px,0,0)',
                //'webkitTransform': 'translateX(' + index * -loopWidth+moveX + 'px)'
            })
            //return {
            //    endPosition : touch.pageX
            //}
        })
        $('#loop-pic').on('touchend', function (e) {
            e.preventDefault();
            var touch = e.touches[0];
            clearInterval(timerId)
            timerId=undefined
            //index++;
            adsorption()
            // 动画 切换transform
            autoMove();
            //console.log(e)


        })
        //吸附效果
        var adsorption= function () {
            //var distance=endPosition-startPosition
            if(Math.abs(moveX)>loopWidth/5){
                if(moveX>0){
                    index--
                }else{
                    index++
                }
            }
        }


    }
    //顶部滚动改变透明度
    top()
    function top() {
        var top = document.querySelector('.top')
        top.style.backgroundColor = 'rgba(0,0,0,0)'
        //轮播图高度
        var loopH = document.querySelector('#loop-pic').offsetHeight
        window.onscroll = function (e) {
            var percent = window.document.body.scrollTop / loopH

            if (percent > 1) {
                percent = 1
            }
            top.style.backgroundColor = 'rgba(0,0,0,' + percent + ')'
        }
    }


    $.getJSON('./info/mobile_1.json', function (data) {
        //console.log(data[0].ifm)
        var str = template('ifm', {list: data})
        $('.ajax-8').html(str)
    })
    //模块单个注册事件
    var navs = document.querySelectorAll('.pic>div')
    for (var i = 0; i < navs.length; i++) {
        $(navs[i]).on('touchmove', function (e) {
            e.preventDefault();
        })
        $(navs[i]).on('touchstart', function (e) {
            //console.log(e.changedTouches[0])
            var page_X = e.changedTouches[0].pageX//鼠标所在位置X
            var page_Y = e.changedTouches[0].pageY//鼠标所在位置Y
            var offset_left = $(this).offset().left//外盒子在浏览器中的位置
            var offset_top = $(this).offset().top//外盒子在浏览器中的位置
            //水波纹效果
            $('.water').remove()//生成span前,移除所有span,防止bug出现
            var span = $('<span class="water"></span>').appendTo($(this))

            if ((page_X - offset_left) > 0 && (page_X - offset_left) < $(this).width() && (page_Y - offset_top) > 0 && (page_Y - offset_top) < $(this).height()) {

                $(span).css({
                    left: (page_X - offset_left) - 40 + 'px',
                    top: (page_Y - offset_top) - 40 + 'px',
                })
                $(span).addClass('animated zoomIn')
                setTimeout(function () {
                    $(span).removeClass('animated zoomIn')
                    $(span).addClass('animated zoomOut')
                }, 200)
                setTimeout(function () {
                    $(span).remove()
                },400)
            }
            changeTab($(this).index() + 1)
            //.index()天坑啊,如果是选择器是返回相对兄弟元素的位置,如果是dom元素集合是返回第一个元素的位置.....
        })
    }
    //每个模块对应的内容
    var changeTab = function (n) {
        $.getJSON('./info/mobile_' + n + '.json', function (data) {
            //console.log(data)
            var str = template('ifm', {list: data})
            $('.ajax-8').html(str)
        })
    }


})