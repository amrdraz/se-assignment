
var $quote = document.querySelector('.quote');
var $author = document.querySelector('.author');



    $(document).ready(function(){

        $("html").click(onClick);

        function onClick(){
            document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'
            $.getJSON('/api/quote',function(quote){
                 $quote.innerHTML = quote.text;
                 $author.innerHTML = quote.author;
            });


        }





    });