
$(document).ready(function() {
  $('html').click(getRandom);
  $('html').click(getRandomQuote);
});

function getRandomQuote(){
  var random_quote;
  var author;

  $.getJSON( 'api/quote', function( data ){
      random_author = data.text;
      author = data.author;
      $('h1').html(random_author);
      $('h3').html(author);
  });
}

function getRandom(){
  var random_color  = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  $(this).css('background-color', random_color);
}
