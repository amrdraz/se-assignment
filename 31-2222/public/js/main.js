var colours = ['rgb(27,133,184)', 'rgb(90,82,85)', 'rgb(85,158,131)', 'rgb(174,90,65)', 'rgb(195,203,113)'];

$('body').on('click', function(event){
	$.ajax({
		url: 'api/quote',
		success: function(newQuote){
			var c = colours[Math.floor(Math.random()*colours.length)];
			$('.wordsOfWisdom').html(newQuote.text);
			$('.theWise').html(newQuote.author);
			$('body').css('background-color', c);
		}
	});
});