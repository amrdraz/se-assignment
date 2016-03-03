var quotes = require('../quotes.js');
var $	   = require('jQuery');

// $(document).ready(function(){
// $('.quote').on('click', function(){
// 	var x = quotes.getQuoteFromDB();
// 	//var data = $(this).closest('.quote').data('item')
// 	var quote= $('<h1> + 'x'+ </h1>');
// 	$(this).closest('.quote').append(quote);
// 	$(this).remove();
// 	$(".quote").css("background-color",'hsl(' + (Math.random() * 360) + ', 55%, 80%)');
//    });
// });


$(document).ready(function(){
$('.quote').on('click', function(){
		$.getJSON("quotes.json", function(object){
		var quote = quotes.getElementByIndexElseRandom(object);	
		$(".quote").append('<h1> + 'quote.text'+ </h1>');
		$(".author").append('<h2> + 'quote.author'+ </h2>');
		var random = hsl(' + (Math.random() * 360) + ', 55%, 80%);
		 $(this).css("background-color", random);
		});
	  });
 });


// var $quote = document.querySelector('.quote');
// var $author = document.querySelector('.author');

// fetch('./quotes.json').then(function(res) {
//         return res.json();
//     }).then(function(quotes) {
//         document.body.addEventListener('click', function() {
//             var quote = quotes.getElementByIndexElseRandom(quotes);
//             document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'
//             $quote.innerHTML = quote.text;
//             $author.innerHTML = quote.author;
//         });
//     });
