$(document).ready(function() {
	
	$('body').click(function(){
		$('body').css('background-color','hsl(' + (Math.random() * 360) + ', 55%, 80%)');

		$.getJSON( "api/quote", function( data ) {
			var text = data.text;
			var author = data.author;
			$('#quote').html(text);
			$('#author').html(author);
		});
	});
});