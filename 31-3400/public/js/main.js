
$(document).ready( function() {


  	function changebackhground(){
    
  	var back = ["#FFB6C1","	#48D1CC	","#F0F8FF", "#AFEEEE", "	#E6E6FA", "	#DCDCDC	 "];
  var rand = back[Math.floor(Math.random() * back.length)];
  $('body').css('background',rand);
  //$("body").css("background", "red");

}
  
$(document.body).click( function(e) {
     changebackhground();
});


  $(".dialog").click( function(e) {
    e.stopPropagation(); // this stops the event from bubbling up to the body
});

 });


	//document.querySelector('#quote').innerHtml = "Title added with javascript";

	// var post = {
 //    "title": "Title added with JavaScript",
 //    "content": "This post's body text was populated with JavaScript too"
//};

$('.dialog').on('click', function (event) {
	$.ajax({
        url: 'api/quotes',
        success: function (post) {
    $('.quotes').html(post.title);
    $('.authors').html(post.content);
		}
	});
});

	

