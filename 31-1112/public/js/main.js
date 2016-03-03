
$(document).click(function() {
	var array = ['red','green','pink','blue','yellow','orange','brown','purple'];
	var i = Math.floor(Math.random() * array.length);
	$("body").css("background-color",array[i]);

	$.ajax({url: "api/quote", success: function(result){
        
        $('#quote').html(result.text);
        $('#author').html(result.author);
    }});
});


