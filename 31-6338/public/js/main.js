//$("p1").click();
//$("p1").click(function(){
 // $(this).css("background-color", "white");
//}); 
//$( document ).ready(function() {
 // $("body").on("click", function() {
  //  $(this).css("background-color", "yellow");
//});  
//});


$(document).ready(function(){
	$("body").on("click", function() {
  var colors = ["#0000A0","#C0C0C0","CCFF33","787878"];
  //var colors = ["FF3366","993366","CCFF33","580000","787878"];                
  var rand = Math.floor(Math.random()*colors.length);           
  $(this).css("background-color", colors[rand]);
  $.ajax({ url:'api/quote' , success: function(post){
  	$('.author').html(post.author);
  	$('.quote').html(post.text);
  }});
  //$('h1').css("color", colors[rand]);
});
});

//$( "#change_background" ).on( "click", function() {
 // $("body").first().css("background-color","white");
//});

