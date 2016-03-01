 document.body.addEventListener('click', function(){
                  $.getJSON( '/api/quote', function( data ) {
                	var text = data.text ; 
                	var author = data.author;
                	document.getElementById('h1quote').textContent = text;
                	document.getElementById('h1Author').textContent = author;
                  });
                  
                  var Red = Math.ceil(Math.random()*255);
                  var Blue = Math.ceil(Math.random()*255);
                  var Green = Math.ceil(Math.random()*255);
                  
                  
                  document.getElementById('body').style.backgroundColor =  "#"+(Red).toString(16)+(Green).toString(16)+(Blue).toString(16);
                  document.getElementById('h1quote').style.color = '#FFFFFF' ;

              
                }, true); 