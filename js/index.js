$(function () {
    $('.main').css({
        height:''+window.screen.height
    })
    //动态获取城市和天气
    jQuery.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js", function () {
        province = remote_ip_info["province"];
        city = remote_ip_info["city"];
        $.ajax({
            url: "http://api.map.baidu.com/telematics/v3/weather?location=" + city + "&output=json&ak=KawiLiQFG552sBQnCWNtv9iluXqrUY12",
            dataType: 'jsonP',
            success: function (data) {
                // 读取对象
                console.log(data)
                var str_weather = template('weather', {list: data})
                $('.weather').html(str_weather)
                //jsonp事件
                $('.weather span').hide()
                $('.weather p').on('mouseenter', function () {
                    $('.weather span').stop(true, true).show(500)
                })
                $('.weather p').on('mouseleave', function () {
                    $('.weather span').stop(true, true).hide(500)
                })
                $('#weather_charts').on('click', function () {
                    var weatherResults = data.results[0];
                    console.log(weatherResults)
                    var data0 = weatherResults.weather_data[0].date+'('+weatherResults.weather_data[0].weather+')'
                    var data1 = weatherResults.weather_data[1].date+'('+weatherResults.weather_data[1].weather+')'
                    var data2 = weatherResults.weather_data[2].date+'('+weatherResults.weather_data[2].weather+')'
                    var data3 = weatherResults.weather_data[3].date+'('+weatherResults.weather_data[3].weather+')'
                    console.log(data0)
                    console.log(data1)
                    console.log(data2)
                    console.log(data3)
                    var wendu0 = weatherResults.weather_data[0].temperature.slice(0, 2)
                    var wendu1 = weatherResults.weather_data[1].temperature.slice(0, 2)
                    var wendu2 = weatherResults.weather_data[2].temperature.slice(0, 2)
                    var wendu3 = weatherResults.weather_data[3].temperature.slice(0, 2)
                    console.log(wendu0)
                    console.log(wendu1)
                    console.log(wendu2)
                    console.log(wendu3)
                    var wendu4 = weatherResults.weather_data[0].temperature.slice(5, 7)
                    var wendu5 = weatherResults.weather_data[1].temperature.slice(5, 7)
                    var wendu6 = weatherResults.weather_data[2].temperature.slice(5, 7)
                    var wendu7 = weatherResults.weather_data[3].temperature.slice(5, 7)
                    console.log(wendu4)
                    console.log(wendu5)
                    console.log(wendu6)
                    console.log(wendu7)
                    var option = {
                        title: {
                            text: city+'最近天气'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['最高温度', '最低温度'],
//					backgroundColor:'rgba(0,0,0,.4)'
                        },
                        //折线颜色
                        color:['deeppink','skyblue'],
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {show: true},
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line','bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        xAxis: {       //直角坐标系 grid 中的 x 轴
                            type: 'category',
                            boundaryGap: false,
                            data: [data0, data1, data2, data3]
                        },
                        yAxis: {       //直角坐标系 grid 中的 y 轴
                            type: 'value',
                            name: '℃'
                        },
                        grid: {
                            left: '10%',
                            right: '10%',
                            bottom: '3%',
                            containLabel: true
                        },
                        series: [      //系列列表
                            {
                                name: '最高温度',
                                type: 'line',
                                data: [wendu0, wendu1, wendu2, wendu3],
                                markLine: {
                                    data: [{type: 'average', name: '平均值'}]
                                }
                            },
                            {
                                name: '最低温度',
                                type: 'line',
                                data: [wendu4, wendu5, wendu6, wendu7],
                                markLine: {
                                    data: [{type: 'average', name: '平均值'}]
                                }
                            },
                        ],
//				backgroundColor:'rgba(0,0,228,.5)'
                    };
                    var myChart = echarts.init(document.getElementById('main'));
                    myChart.setOption(option);
                })

            }
        })
    });
    //头像
    $('.me').on('mouseenter', function () {
        $('.me span').css({
            left: '100%'
        })
    })
    $('.me').on('mouseleave', function () {
        $('.me span').css({
            left: '-100%'
        })
    })
    //闪光灯效果
    var time_down = setInterval(function () {
        autoPlay($('.down'))
    }, 500)
    var time_h = setInterval(function () {
        autoPlay($('.top>h4'))
    }, 800)
    var time_left=setInterval(function () {
        autoPlay($('.left'))
    },1000)
    function autoPlay(Obj) {
        Obj.toggleClass('yellow')
    }


    //二维码显示
    $('.tel-1').on('mouseover', function () {
        $('.erwei').css({
            display: 'block'
        })
    })
    $('.tel-1').on('mouseout', function () {
        $('.erwei').css({
            display: 'none'
        })
    })

    //个人简介上下拉效果
    $('.down').on('click', function () {
        $('.introduce').slideDown(function () {
            $('.down').css({
                opacity: '0'
            })
            $('.up').css({
                opacity: '1'
            })
        });
    })
    $('.up').on('click', function () {
        $('.introduce').slideUp(function () {
            $('.down').css({
                opacity: '1'
            })
            $('.up').css({
                opacity: '0'
            })
        });
    })
    //.left拉出效果
    $('.left').on('click', function () {
        $('#spa').css({
            transform:'translateX(0)'
        })
        setTimeout(function () {
            $('#spa>.spa_bottom').css({
                transform:'translateX(0)'
            })
        },1000)
        setTimeout(function () {
            $('#spa>.spa_left').css({
                transform:'translateY(0)'
            })
        },2000)
    })
    //spa_right效果
    $('.spa_right').on('click', function () {
        $('#spa>.spa_left').css({
            transform:'translateY(-110%)'
        })
        setTimeout(function () {
            $('#spa>.spa_bottom').css({
                transform:'translateX(-200%)'
            })
        },1000)
        setTimeout(function () {
            $('#spa').css({
                transform:'translateX(100%)'
            })
        },2000)
    })

    //个人简介手风琴效果
    var lis_ind = document.querySelectorAll('.shou')
    var num_ind = 2
    for (var i = 0; i < lis_ind.length; i++) {
        lis_ind[i].onmouseover = function () {
            for (var j = 0; j < lis_ind.length; j++) {
                lis_ind[j].firstChild.style.width = '0%'
            }
            this.firstChild.style.width = '100%'
            this.lastChild.style.opacity = '1'
            this.lastChild.style.fontSize = '14px'
            this.parentNode.style.zIndex = ++num_ind + ''
        }
        lis_ind[i].onmouseout = function () {
            for (var k = 0; k < lis_ind.length; k++) {
                lis_ind[k].firstChild.style.width = '0%'
                lis_ind[k].lastChild.style.opacity = '0.5'
                lis_ind[k].lastChild.style.fontSize = '12px'
            }
        }
    }
    $('.denglu_b').on('click', function () {
        $('.denglu').css({
            display:'block'
        })
    })
    $('.zhuce_b').on('click', function () {
        $('.zhuce').css({
            display:'block'
        })
    })
})
//登陆
$(function () {
    var disable0=false
    var disable1=false
    $('#denglu').attr("disabled",true);
    $('#yonghu').on('blur', function () {
        var exp=/^([A-Za-z0-9\u4e00-\u9fa5]{2,18})+$/g
//            console.log($(this).val())
        var str=$(this).val()
        var exp=exp.test(str)
//            console.log(exp)
//            Object.prototype.toString(exp.test(str))
        if(exp){
            console.log('用户名格式正确')
            disable0=true
            if(disable0==true&&disable1==true){
                $('#denglu').attr("disabled",false);
                alert('写数据库')
            }
        }else {
            console.log('用户名格式错误')
            disable0=false
        }
    })
    $('#pwd').on('blur', function () {
        var exp=/\w{8,16}/
        var str=$(this).val()
        var exp=exp.test(str)
//            Object.prototype.toString(exp.test(str))
        if(exp){
            console.log('密码格式正确')
            disable1=true
            if(disable0==true&&disable1==true){
                $('#denglu').attr("disabled",false);
                alert('写数据库')
            }
        }else {
            console.log('密码格式错误')
            disable1=false
        }
    })
    $('#denglu').on('click',function () {
        $.post('denglu.php',{name:$('#yonghu').val(),pwd:$('#pwd').val()}, function (data) {
            console.log(data)
            if(data!='用户名或密码不正确'){

            }
        })
    })
})
//注册
$(function () {
//        $.get('lianjiemysql.php', function (data) {
//            var a=JSON.parse(data)
//            console.log(a)
//        })
    $('#zhuce').attr("disabled",true);
    var disable0=false
    var disable1=false
    var disable2=false
    $('#yonghu').on('blur', function () {
        var exp=/^([A-Za-z0-9\u4e00-\u9fa5]{2,18})+$/g
//            console.log($(this).val())
        var str=$(this).val()
        var exp=exp.test(str)
//            console.log(exp)
//            Object.prototype.toString(exp.test(str))
        if(exp){
            console.log('用户名格式正确')
            $.get('yanzheng.php',{name:$(this).val()+''},function(data){
                console.log(data)
                disable0=true
                if(disable0==true&&disable1==true&&disable2==true&&data=='用户名可用'){
                    $('#zhuce').attr("disabled",false);
                    alert('写数据库')
                }
            })
        }else {
            console.log('用户名格式错误')
            disable0=false
        }
    })
    $('#pwd').on('blur', function () {
        var exp=/\w{8,16}/
        var str=$(this).val()
        var exp=exp.test(str)
//            Object.prototype.toString(exp.test(str))
        if(exp){
            console.log('密码格式正确')
            disable1=true
            if(disable0==true&&disable1==true&&disable2==true){
                $('#zhuce').attr("disabled",false);
                alert('写数据库')
            }
        }else {
            console.log('密码格式错误')
            disable1=false
        }
    })
    $('#repwd').on('blur', function () {
//            var exp=//
        var repwd=$('#repwd').val()
        var pwd=$('#pwd').val()
        if(repwd===pwd){
            console.log('密码重复正确')
            disable2=true
            if(disable0==true&&disable1==true&&disable2==true){
                alert('写数据库')
                $('#zhuce').attr("disabled",false);
            }
        }else {
            console.log('密码重复有误')
            disable2=false
        }
    })
    $('#zhuce').on('click', function () {
        $.post('zhuce.php',{name:$('#yonghu').val(),pwd:$('#pwd').val()}, function () {
        })
    })
})
