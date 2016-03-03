
$(document).ready(function(){

	var colors = ['lightcyan','lightpink','lemonchiffon','greenyellow','mediumspringgreen','powderblue'];

    $('.btn').click(function(){

                $.ajax({
                  url:'http://localhost:3000/api/quote',
                  success: function (quote) {
                  	       var rand = Math.floor((Math.random() * 6) + 1) - 1;
                           $('.currentQuote').css('background-color',colors[rand]);
                           $('.currentAuthor').css('background-color',colors[rand]);
                           $('.btn').html('More quotes ?');
                           $('.currentQuote').html(quote.text);
                           $('.currentAuthor').html(quote.author);
                           $( '.currentQuote' ).effect( "shake" );
                           $( '.currentAuthor' ).effect( "shake" );
                  }
              });
                
    });

});
