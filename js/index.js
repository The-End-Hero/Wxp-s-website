/**
 * Created by VTEC on 2016/10/14.
 */
$(function () {
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
//				yAxis: {},
//				series: [{
//					name: '销量',
//					type: 'bar',
//					data: [5, 20, 36, 10, 10, 20]
//				}]
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
//						stack: '最高',
//						symbol:'pin',
                                data: [wendu0, wendu1, wendu2, wendu3],
                                markLine: {
                                    data: [{type: 'average', name: '平均值'}]
                                }
                            },
                            {
                                name: '最低温度',
                                type: 'line',
//						stack: '最低',
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
        $('#spa').show()
        $('#spa').animate({
            width:'100%'
        },1000, function () {
            $('#spa>.spa_bottom').show()
            $('#spa>.spa_bottom').animate({
                width:'100%'
            },1000, function () {
                //console.log($('#spa>.spa_bottom').width())
                //spa_left
                if($('#spa>.spa_bottom').width()==$('body').width()){
                    //console.log('asd')
                    $('#spa>.spa_left').show()
                    $('#spa>.spa_left').animate({
                        height:'100%'
                    })
                }
            })

        })
    })
    //spa_right效果
    $('.spa_right').on('click', function () {
        $('#spa>.spa_left').animate({
            height:'0'
        }, function () {
            $('#spa>.spa_bottom').animate({
                width:'0'
            }, function () {
                $('#spa').animate({
                    width:'0'
                }, function () {
                    $('#spa>.spa_left').hide()
                    $('#spa>.spa_bottom').hide()
                    $('#spa').hide()
                })
            })
        })
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
})