 
   $(document).ready(function(){
    $('.html').on('click', function (event) {
    $.ajax({
        url: 'api/quote',
        success: function (quote) {
            $('.quote').html(quote.text);
            $('.author').html(quote.author);
        }
    });
      document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'
});
});


