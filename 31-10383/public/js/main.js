$('body').click(function(){
	$.ajax({
		url: '/api/quote',
		success: function(quote){
			$('.quote').html(quote.text);
			$('.author').html(quote.author);
		}
	});
});