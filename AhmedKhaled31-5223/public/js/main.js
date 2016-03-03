$('.quote-load-btn').on('click', function (event) {
    var col1= Math.floor(Math.random()*128);
	var col2 = Math.floor(Math.random()*128);
	var col3 = Math.floor(Math.random()*128);
	$('body').css('background-color',"rgb("+col1+","+col2+","+col3+")");
    
    $.ajax({
        url: 'api/quotes',
        success: function (quote) {
            $('.quote-list-item-header').html(quote.author);
            $('.quote-list-item-body').html(quote.text);
        }
    });
})