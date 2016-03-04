//Change this to ajax and read from db and better jquery

// var $quote = document.querySelector('.quote');
// var $author = document.querySelector('.author');

// fetch('./quotes.json').then(function(res) {
//     return res.json();
// }).then(function(quotes) {
  //  document.body.addEventListener('click', function() {
  $('body').on('click', function (event) {
  $.ajax({
          url: '/api/get',
        success: function (quote) {
            $('.quote').html(quote.text);
            $('.author').html(quote.author);}
        })
        document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 60%)'
        // $quote.innerHTML = quote.text;
        // $author.innerHTML = quote.author;
    });
// });
