$(function () {
    //main切换背景图片
    var timer_bg = setInterval(function () {
        $('.main').toggleClass('fix')
    }, 5000)
    //获取天气
    var city
    var weatherData 
    $.ajax({
        url:'http://api.map.baidu.com/location/ip?ak=KawiLiQFG552sBQnCWNtv9iluXqrUY12&coor=bd09ll',
        dataType:'jsonP',
        success:function (data) {
            console.log(data)
            city=data.content.address
            console.log(city)
            $.ajax({
                url: "http://api.map.baidu.com/telematics/v3/weather?location=" + city + "&output=json&ak=KawiLiQFG552sBQnCWNtv9iluXqrUY12",
                dataType: 'jsonP',
                success: function (data) {
                    // 读取对象
                    //console.log(data)
                    weatherData=data
                    console.log(weatherData)
                    var str_weather = template('weather', {list: data})
                    $('.weather').html(str_weather)
                    //jsonp事件
                    $('.weather span').hide()
                    $('.weather p').on('mouseenter', function () {
                        $('.weather span').stop(true, true).show(500)
                        //var that = this;
                        //layer.tips($('.weather span').html(), that,{
                        //    tips: [1, '#2F4056'],
                        //    time: 4000,
                        //    fixed:true,
                        //    area: '300px',
                        //    skin:'tips_w'
                        //}); //在元素的事件回调体中，follow直接赋予this即可
                        //layer.tips('用户名格式正确', '.weather p', {
                        //    tips: [2, '#78BA32'],
                        //    anim:2,
                        //    fixed:true,
                        //    tipsMore: true,
                        //    content:$('.weather span')
                        //});
                    })
                    $('.weather p').on('mouseleave', function () {
                        $('.weather span').stop(true, true).hide(500)
                    })

                    $('#weather_charts').on('click', function () {
                        var weatherResults = data.results[0];
                        //console.log(weatherResults)
                        var data0 = weatherResults.weather_data[0].date + '(' + weatherResults.weather_data[0].weather + ')'
                        var data1 = weatherResults.weather_data[1].date + '(' + weatherResults.weather_data[1].weather + ')'
                        var data2 = weatherResults.weather_data[2].date + '(' + weatherResults.weather_data[2].weather + ')'
                        var data3 = weatherResults.weather_data[3].date + '(' + weatherResults.weather_data[3].weather + ')'
                        //console.log(data0)
                        //console.log(data1)
                        //console.log(data2)
                        //console.log(data3)
                        //console.log(weatherResults.weather_data[2].temperature.split('~'));
                        console.log(weatherResults.weather_data[0].temperature.replace('℃','').split('~'));
                        console.log(weatherResults.weather_data[1].temperature.replace('℃','').split('~'));
                        console.log(weatherResults.weather_data[2].temperature.replace('℃','').split('~'));
                        console.log(weatherResults.weather_data[3].temperature.replace('℃','').split('~'));
                        var wendu0 = weatherResults.weather_data[0].temperature.replace('℃','').split('~')[0]
                        var wendu1 = weatherResults.weather_data[1].temperature.replace('℃','').split('~')[0]
                        var wendu2 = weatherResults.weather_data[2].temperature.replace('℃','').split('~')[0]
                        var wendu3 = weatherResults.weather_data[3].temperature.replace('℃','').split('~')[0]
                        //console.log(wendu0)
                        //console.log(wendu1)
                        //console.log(wendu2)
                        //console.log(wendu3)
                        var wendu4 = weatherResults.weather_data[0].temperature.replace('℃','').split('~')[1]
                        var wendu5 = weatherResults.weather_data[1].temperature.replace('℃','').split('~')[1]
                        var wendu6 = weatherResults.weather_data[2].temperature.replace('℃','').split('~')[1]
                        var wendu7 = weatherResults.weather_data[3].temperature.replace('℃','').split('~')[1]
                        //console.log(wendu4)
                        //console.log(wendu5)
                        //console.log(wendu6)
                        //console.log(wendu7)
                        var option = {
                            title: {
                                text: city + '最近天气'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['最高温度', '最低温度'],
//					backgroundColor:'rgba(0,0,0,.4)'
                            },
                            //折线颜色
                            color: ['purple','skyblue'],
                            toolbox: {
                                show: true,
                                feature: {
                                    mark: {show: true},
                                    dataView: {show: true, readOnly: false},
                                    magicType: {show: true, type: ['line', 'bar']},
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
                                right: '5%',
                                bottom: '3%',
                                containLabel: true
                            },
                            series: [      //系列列表
                                {
                                    name: '最高温度',
                                    type: 'line',
                                    areaStyle: {normal:{}},
                                    data: [wendu0, wendu1, wendu2, wendu3],
                                    markLine: {
                                        data: [{type: 'average', name: '平均值'}]
                                    }
                                },
                                {
                                    name: '最低温度',
                                    type: 'line',
                                    areaStyle: {normal:{}},
                                    data: [wendu4, wendu5, wendu6, wendu7],
                                    markLine: {
                                        data: [{type: 'average', name: '平均值'}]
                                    }
                                },
                            ],
                        };
                        var myChart = echarts.init(document.getElementById('main'));
                        myChart.setOption(option);
                    })
                }
            })
        }
    })

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
    var time_left = setInterval(function () {
        autoPlay($('.left'))
    }, 1000)

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
            transform: 'translate3d(0,0,0)'
        })
        setTimeout(function () {
            $('#spa>.spa_bottom').css({
                transform: 'translate3d(0,0,0)'
            })
        }, 1000)
        setTimeout(function () {
            $('#spa>.spa_left').css({
                transform: 'translate3d(0,0,0)'
            })
        }, 2000)
    })

    //spa_right效果
    $('.spa_right').on('click', function () {
        $('#spa>.spa_left').css({
            transform: 'translate3d(0,-110%,0)'
        })
        setTimeout(function () {
            $('#spa>.spa_bottom').css({
                transform: 'translate3d(-200%,0,0)'
            })
        }, 1000)
        setTimeout(function () {
            $('#spa').css({
                transform: 'translate3d(100%,0,0)'
            })
        }, 2000)
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

    //spa侧边栏色块 变大 变小 跟随 效果
    $('#point').css({
        top:$('.spa_a')[0].offsetTop+'px'
    })
    $('.item').on('mouseenter', function () {
        var start=$(this)[0].offsetTop
        $('#point').show()
        $('#point').animate({
            top:start+'px'
        },'fast')
        $('#point').removeClass('animated zoomOut')
        $('#point').addClass('animated zoomIn')

    })
    $('.spa_a').on('mouseleave', function () {
        var top=$('#point')[0].offsetTop+$('.item').height()/2-1
        $('#point').removeClass('animated zoomIn')
        $('#point').addClass('animated zoomOut')
    })
    $('.item').on('click', function () {
        $('.item').css({
            //fontSize:'18px',
            color:'darkgray',
            width:'100%',
            zIndex:'1',
            boxShadow:'none',
            //transform:'scale3d(1,1,1)',
            backgroundColor:'#2F4056'
        })
        $(this).css({
            //fontSize:'20px',
            color:'white',
            width:'102%',
            zIndex:'2',
            //postion:''
            boxShadow:'1px 1px 1px 1px black',
            //transform:'scale3d(1.01,1,1)',
            backgroundColor:' #4E5465'
        })
    })
    //登陆注册按钮事件
    $('.denglu_b').on('click', function () {
        $('.denglu').css({
            transform: 'translate3d(0,0,0)'
        })
    })
    $('.zhuce_b').on('click', function () {
        $('.zhuce').css({
            transform: 'translate3d(0,0,0)'
        })
    })
    $('.zhuce_close').on('click', function () {
        $('.zhuce').css({
            transform:'translate3d(0,-200%,0)'
        })
    })
    $('.denglu_close').on('click', function () {
        $('.denglu').css({
            transform:'translate3d(0,-200%,0)'
        })
    })
})


//登陆
$(function () {
    var getTips= function (n) {
        if(n==1){
            layer.tips('用户名格式正确', '#yonghu_d', {
                tips: [2, '#78BA32'],
                anim:2,
                fixed:true,
                tipsMore: true
            });
        }else if(n==2){
            layer.tips('用户名格式错误', '#yonghu_d', {
                tips: [2, '#FF5722'],
                anim:6,
                fixed:true,
                tipsMore: true
            });
        }else if(n==3){
            layer.tips('密码格式正确', '#pwd_d', {
                tips: [2, '#78BA32'],
                anim:2,
                fixed:true,
                tipsMore: true
            });
        }else if(n==4){
            layer.tips('密码格式错误', '#pwd_d', {
                tips: [2, '#FF5722'],
                anim:6,
                fixed:true,
                tipsMore: true
            });
        }

    }
    var disable0 = false
    var disable1 = false
    $('#denglu').attr("disabled", true);
    $('#yonghu_d').on('blur', function () {
        var exp = /^([A-Za-z0-9\u4e00-\u9fa5]{2,18})+$/g
        var str = $(this).val()
        var exp = exp.test(str)
        if (exp) {
            getTips(1)
            console.log('用户名格式正确')
            disable0 = true
            if (disable0 == true && disable1 == true) {
                $('#denglu').attr("disabled", false);
                //alert('写数据库')
            }
        } else {
            getTips(2)
            console.log('用户名格式错误')
            disable0 = false
        }
    })
    $('#pwd_d').on('keyup', function () {
        var exp = /\w{8,16}/
        var str = $(this).val()
        var exp = exp.test(str)
//            Object.prototype.toString(exp.test(str))
        if (exp) {
            getTips(3)
            console.log('密码格式正确')
            disable1 = true
            if (disable0 == true && disable1 == true) {
                $('#denglu').attr("disabled", false);
                //alert('写数据库')
            }
        } else {
            getTips(4)
            console.log('密码格式错误')
            disable1 = false
        }
    })
    $('#denglu').on('click', function () {
        $.post('denglu.php', {name: $('#yonghu_d').val(), pwd: $('#pwd_d').val()}, function (data) {
            console.log(data)
            if (data == '登陆成功,欢迎您,'+$('#yonghu_d').val()) {
                $('.denglu').css({
                    transform:'translateY(-200%)'
                })
                $('.zhuce_b').hide()
                $('.denglu_b').html('欢迎您,'+$('#yonghu_d').val())
                setTimeout(function () {
                    $('.denglu').hide()
                },400)
            }
        })
    })
})

//注册
$(function () {
    var getTips= function (n) {
        if(n==1){
            layer.tips('用户名格式正确', '#yonghu_z', {
                tips: [2, '#78BA32'],
                anim:2,
                fixed:true,
                tipsMore: true
            });
        }else if(n==2){
            layer.tips('用户名格式错误', '#yonghu_z', {
                tips: [2, '#FF5722'],
                anim:6,
                fixed:true,
                tipsMore: true
            });
        }else if(n==3){
            layer.tips('密码格式正确', '#pwd_z', {
                tips: [2, '#78BA32'],
                anim:2,
                fixed:true,
                tipsMore: true
            });
        }else if(n==4){
            layer.tips('密码格式错误', '#pwd_z', {
                tips: [2, '#FF5722'],
                anim:6,
                fixed:true,
                tipsMore: true
            });
        }else if(n==5){
            layer.tips('密码重复正确', '#repwd', {
                tips: [2, '#78BA32'],
                anim:2,
                fixed:true,
                tipsMore: true
            });
        }else if(n==6){
            layer.tips('密码重复有误', '#repwd', {
                tips: [2, '#FF5722'],
                anim:6,
                fixed:true,
                tipsMore: true
            });
        }
    }
    $('#zhuce').attr("disabled", true);
    var disable0 = false
    var disable1 = false
    var disable2 = false
    $('#yonghu_z').on('blur', function () {
        var exp = /^([A-Za-z0-9\u4e00-\u9fa5]{2,18})+$/g
        var str = $(this).val()
        var exp = exp.test(str)
        if (exp) {
            getTips(1)
            console.log('用户名格式正确')
            $.get('yanzheng.php', {name: $(this).val() + ''}, function (data) {
                console.log(data)
                disable0 = true
                if (disable0 == true && disable1 == true && disable2 == true && data == '用户名可用') {
                    $('#zhuce').attr("disabled", false);
                    //alert('写数据库')
                }
            })
        } else {
            getTips(2)
            console.log('用户名格式错误')
            disable0 = false
        }
    })

    $('#pwd_z').on('keyup', function () {
        var exp = /\w{8,16}/
        var str = $(this).val()
        var exp = exp.test(str)
//            Object.prototype.toString(exp.test(str))
        if (exp) {
            getTips(3)
            console.log('密码格式正确')
            disable1 = true
            if (disable0 == true && disable1 == true && disable2 == true) {
                $('#zhuce').attr("disabled", false);
                //alert('写数据库')
            }
        } else {
            getTips(4)
            console.log('密码格式错误')
            disable1 = false
        }
    })

    $('#repwd').on('keyup', function () {
//            var exp=//
        var repwd = $('#repwd').val()
        var pwd = $('#pwd_z').val()
        if (repwd === pwd) {
            getTips(5)
            console.log('密码重复正确')
            disable2 = true
            if (disable0 == true && disable1 == true && disable2 == true) {
                //alert('写数据库')
                $('#zhuce').attr("disabled", false);
            }
        } else {
            getTips(6)
            console.log('密码重复有误')
            disable2 = false
        }
    })

    $('#zhuce').on('click', function () {
        $.post('zhuce.php', {name: $('#yonghu_z').val(), pwd: $('#pwd_z').val()}, function (data) {
            console.log(data)
            if(data=='注册成功'){
                $('.zhuce').css({
                    transform:'translateY(-200%)'
                })
                $('.denglu_b').hide()
                $('.zhuce_b').html('欢迎您,'+$('#yonghu_z').val())
                setTimeout(function () {
                    $('.zhuce').hide()
                },400)
            }
        })
    })
})
