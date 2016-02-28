var $quote = document.querySelector('.quote');
var $author = document.querySelector('.author');
    
        $("body").click(function(){

         

            $.get("/api/quote",function(quote, status){

            
            $("body").css("background",'hsl(' + (Math.random() * 360) + ', 55%, 80%)');
            $quote.innerHTML = quote.text;
            $author.innerHTML = quote.author;
        });
            
        });