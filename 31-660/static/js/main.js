
    $ ('body').click(function (event) {
    $.ajax({
        url: 'api/quote',
        success: function (quotes) {
            $('.quote').html(quotes.text);
            $('.author').html(quotes.author);
        }
    });
    $('body').css('backgroundColor', ('hsl(' + (Math.random()*700)+', 70% , 80%'));
});