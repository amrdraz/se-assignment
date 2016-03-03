


	$('body').on('click', (function(event){
    if (e.target === this) {
    	      //  window.location = "http://google.com'"
    	$.ajax({
    		//url: 'quotes.json',
    		url: 'api/post',
    		success: function(quote){
    			$('.quote').html(quotes.text);
    			$('.author').html(quotes.author);
    		}
    	})
    }
});


})