

$(document).on('click', function (event) {
  $.ajax({
    url: '/api/quote',
    success: function(quote){


    $('.quote').html(quote.text);
    $('.author').html(quote.author);
    document.body.style.backgroudColor = 'hsl(' + (Math.random() * 360) + ',55%,80%)'
  }
  });
});
