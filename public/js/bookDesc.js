$(document).ready(function () {
    $('#main').mouseover(function () {
        $('#toggle').css({
            position: 'absolute',
            left: '0',
            transition: '0.5s'
        })

        $('span').css({
            color: 'white',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'white',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
        })
    })

    $('#main').mouseout(function () {
        $('#toggle').css({
            position: 'absolute',
            left: '-105%',
            transition: '0.5s'
        })
        $('span').css({
            color: 'purple',
            borderColor: 'black'
        })
    })
})