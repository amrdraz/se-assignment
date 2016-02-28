

function inspireMe()
{
     document.body.style.backgroundColor = 
  "#" + (Math.random()*0xFFFFFF<<0).toString(16); 
   var flickerAPI = "/api/quote";
  $.getJSON( flickerAPI, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
       

document.getElementById("quote").innerHTML = data.text;
document.getElementById("author").innerHTML = data.author;


    });
}


  window.onclick= function()
	{
   inspireMe();
	}
    window.onload= function()
  {
  
document.getElementById("quote").innerHTML = "Click anywhere to get inspired";
document.getElementById("author").innerHTML = "";
 document.body.style.backgroundColor = 
  "#" + (Math.random()*0xFFFFFF<<0).toString(16); 
  }