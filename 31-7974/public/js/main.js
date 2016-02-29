$(document).click(function() {
	var s = "rgb("+ Math.floor(256*Math.random()) + "," + Math.floor(256*Math.random()) 
				+ "," + Math.floor(256*Math.random())+")";
	$("body").css({"background-color":s});
	
	$.ajax({url: "/api/quote", success: function(result){
		var sentence = result.text;
		var author = result.author;

        $("#click_div").html(sentence);
        $("#author_div").html(author);
    }});
});