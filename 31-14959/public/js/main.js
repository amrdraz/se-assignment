//change the background color randomly using randomColorjs class
$(document).ready(function(){
    $("body").click(function(){
      	$.get("/api/quote", function(data, status) {
          $("body").css("background", randomColor());
          $('blockquote.quote').text(data.text);
          $('div.author').text(data.author);

            });
       });
});
