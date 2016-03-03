
$(document).ready(function(){

    $('.btn').click(function(){

                $.ajax({
                  url:'http://localhost:3000/api/quote',
                  success: function (quote) {
                    
                           $('.currentQuote').html(quote.text);
                           $('.currentAuthor').html(quote.author);

                  }
                });
                
    });

});
