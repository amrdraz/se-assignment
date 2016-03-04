
$('body').click(function(){
	var RED = Math.floor(Math.random()*128);
	var GREEN = Math.floor(Math.random()*128);
	var BLUE = Math.floor(Math.random()*128);
	$('body').css('background-color',"rgb("+RED+","+GREEN+","+BLUE+")");


	$.getJSON( "api/quote", function( gotQuote ) {
		var text = gotQuote.text;
		var author = gotQuote.author;
		$('#quote').html(text);
		$('#author').html(author);
	});
});
