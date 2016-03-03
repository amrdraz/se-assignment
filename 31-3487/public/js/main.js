// var quotes = require('../../db.js')

// $(document).ready(function(){

//   // Animate "Click something."

//   $(document).on("click", function() {

  	
//     $(document).css({"background-color": quotes.getElementByIndexElseRandom(colours)});
//       // Update quote
//       var randomQuote = quotes.getQuoteFromJSON();
//       $("h1").text('“' + randomQuote.text + '”');
//       $("h2").text(randomQuote.author);

//       // Animate author name
//       $('h2').typeIt();

//     });

//   	$.getJSON( "api/quote", function( data ) {
// 		var text = data.text;
// 		var author = data.author;
// 		$('#quote').html(text);
// 		$('#author').html(author);
// 	});

// });
$(document).ready(function(){


$(document).on('click', function (event) {
  var index = Math.floor(Math.random()*colours.length)
 
 
  $.ajax({
        url: 'api/quote',
        success: function (quote) {
            $('#quote').html('"'+quote.text+'"');
            $('#author').html('-'+quote.author);
        }
    });
   $('body').css({"background-color" : colours[index] })
})


})

// var quotesArray = require('../../../quotes.json')
// Colours array
var colours = ["#0066cc","#e6e600","#cc00ff","#009933","#0099ff","#339966","#004d4d","#4b2c17","#fabf00","#ff8000"];