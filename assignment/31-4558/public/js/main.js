$(document).ready(function(){
$('body').on('click', function (event) {
    $.ajax({
        url: 'api/quote',
        success: function (quote) {
            $('.quote').html(quote.text);
            $('.author').html(quote.author);
            $('body').css("background", '#'+ Math.floor(Math.random()*16777215).toString(16));
        }
    });
});
});