
$(document).ready(function(){

	$("body").click(onClick);

	function  onClick(){
		$.getJSON('/api/quote',function(quote){
	            document.querySelector('.quote').innerHTML=quote.text;
	            document.querySelector('.author').innerHTML=quote.author;
	            document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)';

	    });
	}
	    
});

