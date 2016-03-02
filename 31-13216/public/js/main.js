document.querySelector('html').onclick = function(){
   	document.body.style.backgroundColor = 'hsl('+ (Math.random()*360)+',55%,80%)';
	loadJSON(function(response) {
   		var actual_JSON = JSON.parse(response);
   		document.querySelector('.quote').textContent= actual_JSON.text;
   		document.querySelector('.name').textContent= actual_JSON.author;
 	});
};

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/api/quote', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }