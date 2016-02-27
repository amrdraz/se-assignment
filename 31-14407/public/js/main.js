$(document).ready(function(){
  $("body").click(function(){
    $.get("/api/quote",function(data,status){
      $("body").css
      $('blockquote.quote').text(data.text);
      $('.author').text(data.author)
    });
  });
  $.get("/*",function(data,status){
    
  });
});
