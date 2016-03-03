	$(document).ready(function() {
	    $("body").click(onClick);
	});

	function onClick() {
	    document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'

	    $.getJSON('/api/quote', function(quote) {
	        var author = quote.author;
	        var text = quote.text;
	        $("#author").html(author);
	        $("#text").html(text);
	    });
	}
