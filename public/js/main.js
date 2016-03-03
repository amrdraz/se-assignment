$(document).ready(function(){
  $("body").click(function(){
    $.get("/api/quote",function(data,status){
      $('blockquote.quote').text(data.text);
      $('.author').text(data.author)

    });
  });
});
