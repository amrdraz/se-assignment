// <script>
//     var $quote = document.querySelector('.quote');
//     var $author = document.querySelector('.author');

    
    
//         document.body.addEventListener('click', function() {
//             fetch('/api/quote').then(function(res) {
//             return res.json();
//             }).then(function(quote) {
//             document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'
//             $quote.innerHTML = quote.text;
//             $author.innerHTML = quote.author;
//         });
//     });
//     </script>


var $quote = document.querySelector('.quote');
var $author = document.querySelector('.author');
    
$("body").click(function(){

   $.get("/api/quote",function(quote, status){
        
    $("body").css("background",'hsl(' + (Math.random() * 360) + ', 55%, 80%)');
    $quote.innerHTML = quote.text;
    $author.innerHTML = quote.author;

   });
    
});
