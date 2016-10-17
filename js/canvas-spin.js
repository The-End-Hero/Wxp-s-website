/**
 * Created by VTEC on 2016/10/17.
 */
var cv=document.getElementById('c')
var ctx=cv.getContext('2d');

cv.width=600;
cv.height=600;

//弧度转化为角度
var toAngle= function (radian) {
    return radian/Math.PI*180
}
//角度转化为弧度
var toRadian= function (angle) {
    return angle/180*Math.PI
}
var x0=cv.width/ 2,y0=cv.height/ 2,//圆心点坐标
    outerRaidus=200,         //外环的半径
    innerRadius=200/2,//内环的半径
    bigStartAngle=-90,//外环上圆的起始角度
    smallStartAngle=-90,//内环上圆的起始角度
    bigRadius=45,//外环上圆的半径
    smallRadius=35,//内环上圆的半径
    step=1//转动的速度

//大小圆的颜色值数据
var bigCircles=[{
    'color':"rgba(178, 58, 238,0.5)",
    'title':'jQurey'
},{
    'color':"rgba(139, 69, 19,0.5)",
    'title':'Angular'
},{
    'color':"rgba(16, 78, 139,0.5)",
    'title':'Vue'
},{
    'color':"rgba(165, 42, 42,0.5)",
    'title':'Node'
},{
    'color':"rgba(205, 155, 29,0.5)",
    'title':'React'
}]
var smallCircles=[{
    'color':"rgba(255,0,0,0.5)",
    'title':'JS'
},{
    'color':"rgba(255,255,0,0.5)",
    'title':'CSS'
},{
    'color':"rgba(0,0,255,0.5)",
    'title':'HTML'
}];
var render= function () {
    //清空画布
    ctx.clearRect(0,0,cv.width,cv.height)
    //保存当前的绘制状态(状态1,即默认状态)
    ctx.save()
    //开启新路径
    ctx.beginPath()

    //绘制中心园
    ctx.arc(x0,y0,55,0,Math.PI*2)
    ctx.fillStyle='rgba(0,0,0,0.5)'
    ctx.fill()
    //绘制重叠圆
    ctx.beginPath()
    ctx.arc(x0,y0,55-10,0,Math.PI*2)
    ctx.fillStyle='rgba(0,0,0,0.5)'
    ctx.fill()
    ctx.beginPath()
    ctx.textAlign='center'
    ctx.textBaseline='middle'
    ctx.fillStyle='white'
    ctx.font="30px 微软雅黑";
    ctx.fillText('前端',x0,y0, 300)
    //绘制外环
    ctx.beginPath()
    ctx.setLineDash([5])//虚线的空隙
    ctx.strokeStyle='rgba(102,102,102,0.7)'//虚线的颜色
    ctx.arc(x0,y0,outerRaidus,0,Math.PI*2)
    ctx.stroke()
    //绘制内环
    ctx.beginPath();
    ctx.arc(x0,y0,innerRadius,0,Math.PI*2)
    ctx.stroke()
    //重新载入 状态1
    ctx.restore()

    //保存 状态2
    ctx.save()
    //绘制外环的圆
    for(var i=0;i<bigCircles.length;i++){
        ctx.beginPath()
        //计算圆弧上的点坐标
        var tempX=x0+outerRaidus*Math.cos(toRadian(bigStartAngle+=72))
        var tempY=y0+outerRaidus*Math.sin(toRadian(bigStartAngle))

        ctx.arc(tempX,tempY,bigRadius,0,Math.PI*2)
        ctx.fillStyle=bigCircles[i].color
        ctx.fill()
        ctx.beginPath()
        ctx.arc(tempX,tempY,bigRadius-10,0,Math.PI*2)
        ctx.fillStyle=bigCircles[i].color
        ctx.fill()
        ctx.beginPath()
        ctx.textAlign='center'
        ctx.textBaseline='middle'
        ctx.fillStyle='white'
        ctx.font="20px 微软雅黑";
        ctx.fillText(bigCircles[i].title,tempX,tempY, 300)
    }
    //重新载入 状态2
    ctx.restore()

    ctx.save();
    //绘制内环的圆
    for(var i=0;i<smallCircles.length;i++){
        ctx.beginPath();
        // 计算圆弧上点的坐标
        var tempX = x0 + innerRadius * Math.cos( toRadian(smallStartAngle += 120) ),
            tempY = y0 + innerRadius * Math.sin( toRadian(smallStartAngle) );

        ctx.arc(tempX, tempY, smallRadius, 0, Math.PI * 2);
        ctx.fillStyle = smallCircles[i].color;
        ctx.fill();
        ctx.beginPath()
        ctx.arc(tempX, tempY, smallRadius-8, 0, Math.PI * 2);
        ctx.fillStyle = smallCircles[i].color;
        ctx.fill();
        ctx.beginPath()
        ctx.textAlign='center'
        ctx.textBaseline='middle'
        ctx.fillStyle='white'
        ctx.font="20px 微软雅黑";
        ctx.fillText(smallCircles[i].title,tempX,tempY, 300)
    }
    ctx.restore();
    //每次修改起始角度,实现转动效果
    bigStartAngle+=step;
    smallStartAngle-=step
}

setInterval(render,1000/60);
cv.addEventListener('mouseenter', function () {
    step=0.3;
})
cv.addEventListener('mouseleave', function () {
    step=1;
})