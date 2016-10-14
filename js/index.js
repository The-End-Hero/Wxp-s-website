/**
 * Created by VTEC on 2016/10/14.
 */
$(function () {
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