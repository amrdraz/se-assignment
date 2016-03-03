    //var $quote = document.querySelector('.quote');
    //var $author = document.querySelector('.author');
$(document).ready(function(){

   $("body").click(onClick);
   function onClick(){
       $.getJSON('/api/quote',function(quote){
            document.querySelector('.quote').innerHTML = quote.text;
            document.querySelector('.author').innerHTML = quote.author;
            document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)';
        });
   }
});


   //function  onClick(){
    //  $.getJSON('/api/quote',function(req, quote, next){


    /*fetch('./quotes.json').then(function(res) {
        return res.json();
    }).then(function(quotes) {
        document.body.addEventListener('click', function() {*/
           // var quote = getElementByIndexElseRandom(quotes);
        //    document.querySelector('.quote').innerHTML=quote.text;
        //    document.querySelector('.author').innerHTML=quote.author;
        //    document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)';
            //$('#quote').html(quote.text);
            //$('#author').html(quote.author);
            //$quote.innerHTML = quote.text;
            //$author.innerHTML = quote.author;
      //  });
    // }