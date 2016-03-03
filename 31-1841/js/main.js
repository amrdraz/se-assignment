var main = function() {



$('body').click(function(){
		$('body').css('background-color','hsl(' + (Math.random() * 360) + ', 55%, 80%)');

		$.getJSON( "api/quote", function( data ,status ) { //it wase quote but the get function return on post
			var text = data.text;
			var author = data.author;
			$('#quote').html(text);
			$('#author').html(author);
		});
	});

	  };

	  $(document).ready(main);
