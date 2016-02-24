var quote = $(".quote")
var author = $(".author")

$("body").click(function() {
	$.get("/api/quote", function(data, status) {
		var rndclr = Math.random() * 360
		var clrstr = "hsl(" + rndclr + ", 55%, 80%)"
		$("body").css("background", clrstr)
		quote.text(data.text)
		author.text(data.author)
	})
})