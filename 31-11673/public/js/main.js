$(document).click(function() {
	var x = ['#B452CD','#7A67EE','#0000EE','#00E5EE','#00C78C','#54FF9F','#B3EE3A','#B3EE3A','#FF7D40','#FF7D40','#FF3030','#EE3A8C','#FFC0CB'];
	 y = x[Math.floor(Math.random()*x.length)],
	$("body").css({"background-color":y});

	$.ajax({url: "/api/quote", success: function(result){
		
        $("#sentence").html(result.text);
        $("#author").html(result.author);
    }});

});
