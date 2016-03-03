// main.js

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
$(document).ready(function(){
$('#page').on('click', function (event) {
    $.ajax({
        url: 'api/quote',
        success: function (quote) {
        var colour= getRandomColor();
        $('#no').css("background-color", colour);
        quote = JSON.parse(quote);
            $('#lol').html(quote.author);
            $('#q').html(quote.text);
        }
    });
});
});
