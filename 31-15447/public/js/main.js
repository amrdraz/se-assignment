$(document).ready(function(){
 	$("body").click(function(){
    $( "body" ).hide();
		$.getJSON( "api/quote", function( data ) {
			$("#quote").html(data.text);
			$("#author").html(data.author);

		});
    $( "body" ).fadeIn( "slow", function() {
     });

    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    $("body").css('background-color','rgb('+red+','+green+','+blue+')');
	});
});
