/**
 * Created by VTEC on 2016/10/14.
 */
$(function () {
    //jsonp天气
    $.getJSON('http://api.jirengu.com/weather.php', function (data) {
        console.log(data)
        var str_weather=template('weather',{list:data})
        $('.weather').html(str_weather)
        //jsonp事件
        $('.weather span').hide()
        $('.weather p').on('mouseenter', function () {
            $('.weather span').stop(true,true).show(500)
        })
        $('.weather p').on('mouseleave', function () {
            $('.weather span').stop(true,true).hide(500)
        })
    })
    //头像
    $('.me').on('mouseenter', function () {
        $('.me span').css({
            left:'100%'
        })
    })
    $('.me').on('mouseleave', function () {
        $('.me span').css({
            left:'-100%'
        })
    })
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
    //个人简介手风琴效果
    var lis_ind=document.querySelectorAll('.shou')
    var num_ind=2
    for(var i= 0;i<lis_ind.length;i++){
        lis_ind[i].onmouseover= function () {
            for(var j=0;j<lis_ind.length;j++){
                lis_ind[j].firstChild.style.width='0%'
            }
            this.firstChild.style.width='100%'
            this.lastChild.style.opacity='1'
            this.lastChild.style.fontSize='14px'
            this.parentNode.style.zIndex=++num_ind+''
        }
        lis_ind[i].onmouseout= function () {
            for(var k=0;k<lis_ind.length;k++){
                lis_ind[k].firstChild.style.width='0%'
                lis_ind[k].lastChild.style.opacity='0.5'
                lis_ind[k].lastChild.style.fontSize='12px'
            }
        }
    }
})