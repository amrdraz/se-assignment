var main = function() {



$('body').click(function(){
		$('body').css('background-color','hsl(' + (Math.random() * 360) + ', 55%, 80%)');


		$.getJSON( "/api/quote", function(data) { 
			var text = data.text  ; 
			var author = data.author; 
			$('blockquote.quote').html(text); 
			$('blockauthor.author').html(author);
		});
	});

	  }

	  $(document).ready(main);
