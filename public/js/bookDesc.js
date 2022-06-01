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
            borderColor: 'black',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            letterSpacing: '2px',
            transition : '0.5s'
        })

        $('p').css({
            color: 'black',
            transition: '0.5s'
        })

        $('.edited').css({
            color: 'black',
            transition: '0.5s',
            border: 'none'
        })
    })

    $('#main').mouseout(function () {
        $('#toggle').css({
            position: 'absolute',
            left: '-105%',
            transition: '0.5s'
        })
        $('span').css({
            color: '#996515',
            borderColor: 'black',
            letterSpacing: '0px',
            transition : '0.5s'
        })

        $('p').css({
            color: 'black',
            transition: '0.5s'
        })

        $('.edited').css({
            color: 'black',
            transition: '0.5s',
            border: 'none'
        })
    })
})