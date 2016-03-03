//var $quote = document.querySelector('.quote');
//var $author = document.querySelector('.author');

// $("body").on('click',function(){
//     $.get("/api/quote",function(quote,status){
//         $("body").css("background",'hsl(' + (Math.random() * 360) + ', 55%, 80%)');
//         $quote.innerHTML = quote.text;
//             $author.innerHTML = quote.author;
//     });
// });
$(document).ready(function(){
    $("body").click(function(){
        $.get("/api/quote",function(quote,status){
            $("body").css("background",'hsl(' + (Math.random() * 360) + ', 55%, 80%)');
            $('.quote').text(quote.text);
            $('.author').text(quote.author);
       });
   });
});
