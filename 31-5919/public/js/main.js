$(document).ready(function(){

var colors = ["blue", "cyan", "yellow", "magenta", "red", "green"];

	$("html").click(onClick);

function onClick(){
	$("body").css("background-color",colors[Math.floor(Math.random() * colors.length)]);
	$.getJSON('/api/quote',function(quote){
		var author = quote.author;
		var text = quote.text;
		$("#author").html(author);
		$("#text").html(text);
		});
	}
});