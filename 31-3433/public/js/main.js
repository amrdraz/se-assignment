$('body').on('click',function(event){
    $.ajax({
        url: '/api/quote',
        success: function(quote){
        	document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'
            $('.quote').html(quote.text);
            $('.author').html(quote.author);
        }
    });
});