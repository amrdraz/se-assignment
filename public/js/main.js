var colors = ["Aquamarine", "LightSalmon", "DarkSeaGreen", "Khaki", "Lavender", "LightBlue", "LightCoral",
 "LightGray", "Plum", "LightOrange"];

function changeColor() {
    var col = document.getElementById("page");
    col.style.backgroundColor = colors[Math.floor((Math.random()*8)+1)];
}

$('html').on('click',function(event){
	$.ajax({
		url:'api/quote',
		success:function(quote){
			$('.quote').html(quote.text);
			$('.author').html(quote.author);
            changeColor();
		}
	});
});
