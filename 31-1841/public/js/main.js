var main = function() {



$('body').click(function(){
		$('body').css('background-color','hsl(' + (Math.random() * 360) + ', 55%, 80%)');


		$.getJSON( "/api/quote", function(data) { //it wase quote but the get function return on post
			var text = data.text  ; //esmha title ya beha 3shan enta b3etha title
			var author = data.author; //content ^
			$('blockquote.quote').html(text); //bettet3mel kda msh zay l-ta7t :)
			$('blockauthor.author').html(author);
		});
	});

	  }

	  $(document).ready(main);
