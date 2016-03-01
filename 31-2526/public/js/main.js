$(document).ready(function(){
  $("body").click(function(){
    $.get('/api/qoute',function(data,status){
      $("body").css
 	      var r = Math.floor(Math.random()*128);
 	      var g = Math.floor(Math.random()*128);
 	      var b = Math.floor(Math.random()*128);
        var n = Math.floor(Math.random()*data.length);
 	    $('body').css('background-color',"rgb("+r+","+g+","+b+")");
      $('blockquote.quote').text(data.text);
      $('.author').text(data.author)
    });
  });
});
