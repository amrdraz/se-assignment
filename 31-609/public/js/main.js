$(document).ready(function() {
  $('html').click(function() {
    $('.HomePage').css({
      backgroundColor: pickColor()
    });

    // the rest of the code with the Ajax is here
    $.ajax({url: "/api/quote", success: function(response){
        var quote = response.text;
        var author = response.author;
        $('.quote').html(quote);
        $('.author').html(author);
    }});
  });
});

function pickColor(){
  return 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')' ;
}
