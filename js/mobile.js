$(function () {
    $.getJSON('./loopPic.php', function (data) {
        //console.log(data)
        var str=template('loop',{list:data})
        $('#loop-pic').html(str);
    })



})