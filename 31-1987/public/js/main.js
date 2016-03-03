

var counter=0;;
$(document.body).on('click', function (event) {

          var color =getRandomColor;
          $(document.body).css('background',color);
          $(document.header).css('background',color);
          changeQuote();


});

function changeQuote(){
  $.ajax({
      url: '/api/quote',
      success: function (post) {
        $('.header h1').html(post.text);
        counter++;
        $('.author').html(post.author);

    }
});
}







function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
