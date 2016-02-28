$(document).ready(function(){ 


var $quote = document.querySelector('.quote');
var $author = document.querySelector('.author');

   document.addEventListener('click', function() {
            document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'



 $.getJSON('api/quote', function(data) {

    $('#quote').html(data.text);

 	$('#author').html(data.author);


         // Do stuff with data if succeeds in getting the data
       
         });

          
        });
    });