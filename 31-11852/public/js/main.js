 $(document).ready(function(){  
	document.body.addEventListener('click',changeColor); 
	document.body.addEventListener('click',changeQuote);  
    
});
 
 function get_random_color() {
  function c() {
    var hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2); 
  }
  return "#"+c()+c()+c();
}

function changeColor(event){  

 
 document.body.style.backgroundColor = get_random_color();

$.ajax({  
   type: 'GET',
   url: '/api/quote'
});

}
 function changeQuote(event){ 
$.ajax({  
   type: 'GET',
   url: '/api/quote'
}).done(function(response){  

   var quote = document.querySelector('.quote');
   var author = document.querySelector('.author');
	quote.innerHTML = response.text;
	author.innerHTML = response.author;
  //$.('.quote').html("new quote");
});  

 }







