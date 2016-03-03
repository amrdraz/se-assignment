$(document).ready(function() {
    $('body').on('click',changeColor);
    $('body').on('click',selectQuote);
    $('button').on('click',printQuotesinConsole);

});


function changeColor(){
	$('body').css('background','#'+(Math.random()*0xFFFFFF<<0).toString(16));
	console.log("clicked");
}


function selectQuote() {
	$.ajax({
        type: 'GET',
        url: '/api/quote',
        success: function (finalQuote) {
            console.log(finalQuote.text);
            console.log(finalQuote.author);
            $('.theQuote').html(finalQuote.text);
            $('.theAuthor').html(finalQuote.author);
        }
    });
}
function printQuotesinConsole(){
    $.ajax({
        type: 'GET',
        url: '/api/quotes',
        success: function (finalQuotes) {
            console.log(finalQuotes);
        }    
    });
}
