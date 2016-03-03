// $(document).click(function () {
//     var x=['#0000ff','#00ff00','#ff0000','#F0F8FF','#00FFFF','#FF7F50','#E9967A','#DAA520','#ADFF2F','#ADD8E6','#FFB6C1','#FFA07A','#F4A460','#008080','#BA55D3','#90EE90','#B0E0E6'];
//     y=x[Math.floor(Math.random()*x.length)];
//     $("body").css({"background-color":y});
//      $("body").click(function(){
//        $.get("/api/quote",function(data,status){
//          $("body").css
//          $('blockquote.quote').text(data.text);
//          $('.author').text(data.author)
//         });
//       });
// });

$(document).ready(function(){
 $("body").click(function(){

       var x=['#0000ff','#00ff00','#ff0000','#F0F8FF','#00FFFF','#FF7F50','#E9967A','#DAA520','#ADFF2F','#ADD8E6','#FFB6C1','#FFA07A','#F4A460','#008080','#BA55D3','#90EE90','#B0E0E6'];
       y=x[Math.floor(Math.random()*x.length)];
       $("body").css({"background-color":y});
        $("body").click(function(){
          $.get("/api/quote",function(data,status){
            $("body").css
            $('blockquote.quote').text(data.text);
            $('.author').text(data.author)
           });
          });

 $.get("/api/quote",function(data,status){
 $("body").stylesheets
 $('blockquote.quote').text(data.text);
 $('.author').text(data.author)
 });
 });

});
