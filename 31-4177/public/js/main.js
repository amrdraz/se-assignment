var $quote = document.querySelector('.quote');
var $author = document.querySelector('.author');

$(document).ready(function() {
    document.body.addEventListener('click', loadQuote);
});

function loadQuote(event) {

    // Prevent Link from Firing
    event.preventDefault();

    //Populate Info Box
    $.ajax({
        type: 'GET',
        url: '/api/quote/'
        }).done(function( response ) {
          document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)';
          $quote.innerHTML = response.text;
         $author.innerHTML = response.author;
      });
}
