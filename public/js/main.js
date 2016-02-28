$('body').on('click', function (event) {
    $.ajax({
        url: 'api/quote',
        success: function (quote) {
            $('.quote').html(quote.text);
            $('.author').html(quote.auhor);
        }
    });
});