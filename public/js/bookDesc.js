$(document).ready(function () {
    $('#main').mouseover(function () {
        $('#image').css({
            borderRadius: '0',
            transition: '0.5s'
        })
        $('#toggle').css({
            position: 'absolute',
            left: '0',
            transition: '0.5s'
        })
    })

    $('#main').mouseout(function () {
        $('#image').css({
            borderRadius: '50%',
            transition: '0.5s'
        })
        $('#toggle').css({
            position: 'absolute',
            left: '-105%',
            transition: '0.5s'
        })
    })
})