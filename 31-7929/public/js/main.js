//alert("Hi menna");

$(document).ready(function(){
    $("html").click(function(){
		$.get("/api/quote",function(data,status){
			document.body.style.background = getRandomColor();
		       $("blockquote.quote").text(data.text);
		       $(".author").text(data.author);
		     });

    });
});
    
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


