$(document).click(function() {
		colors = ["red", "blue", "green", "purple", "yellow", "black", "grey", "pink"];
	 	var num = Math.floor(Math.random() * colors.length);
	  	var color = colors[num];  
	   	$("body").css("background-color",color); 

	   	$.ajax({url: "/api/quote", success: function(result){
		
        $("#sentence").html(result.text);
        $("#author").html(result.author);
    }});
});
