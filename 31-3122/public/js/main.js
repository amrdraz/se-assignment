$(document).ready(function(){
	var quote = $(".quote")
	var author = $('.author');

	$('body').on('click',function() {
		$.get('/api/quote', function(quoteObject) {
			$('body').css('background-color','hsl(' + (Math.random() * 360) + ', 55%, 80%)');
			quote.text(quoteObject.text);
			author.text(quoteObject.author);
		});		

	});

});