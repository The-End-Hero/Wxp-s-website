/**
 * Created by VTEC on 2016/10/14.
 */
$(function () {
    //down闪光灯效果
    time_down=setInterval(function () {
        autoPlay($('.down'))
    },800)
    function autoPlay(Obj){
        Obj.toggleClass('yellow')
    }

    //二维码显示
    $('.tel-1').on('mouseover', function () {
        $('.erwei').css({
            display:'block'
        })
    })
    $('.tel-1').on('mouseout', function () {
        $('.erwei').css({
            display:'none'
        })
    })

    //个人简介上下拉效果
    $('.down').on('click', function () {
        $('.introduce').slideDown(function () {
            $('.down').css({
                opacity:'0'
            })
            $('.up').css({
                opacity:'1'
            })
        });
    })
    $('.up').on('click', function () {
        $('.introduce').slideUp(function () {
            $('.down').css({
                opacity:'1'
            })
            $('.up').css({
                opacity:'0'
            })
        });
    })
})