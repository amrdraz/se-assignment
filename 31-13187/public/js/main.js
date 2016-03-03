$(document).ready(function(){

var colors =["cyan","blue","red","black","white"];
$("html").click(onClick);
function onClick () {
  document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'
 $("#button").html('');
 $.getJSON('/api/quote',function(quote){
  var text = quote.text ; 
  var author = quote.author;
  $("#author1").html(author);
  $("#quote1").html(text);
	});

}
}
);