

$(document).ready(function(){
	window.onclick=function(){
		var red = Math.floor(Math.random()*128)+120;
		var green = Math.floor(Math.random()*128)+120;
		var blue = Math.floor(Math.random()*128)+120;

		$('body').css('background-color','rgba('+red+','+green+','+blue+', 0.5)');
		changeQuotes();};
	});

	

function changeQuotes(){
	// var app = require('../../app.js');	
		$.ajax({
 			type: "GET",
 			url: "/api/quote",
  			success: function(quote){
  				console.log(quote);
  				$('h1').text(quote.text);
     			$('h2').text(quote.author);
     			$('h2').css({'position':'absolute','top':'80%','left':'80%'});
  }
});
	}