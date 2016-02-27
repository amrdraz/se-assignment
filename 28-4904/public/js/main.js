// Code for detecting button click
var myFirstLine = document.getElementById("FirstLine");
var mySecondLine = document.getElementById("SecondLine");

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send();
    console.log(xmlHttp.responseText);
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

myFirstLine.onclick = function() 
{
	var quote = httpGet('www.localhost:8080/api/quote');
	console.log(quote);
	var Author = quote.author;
	var Text = quote.text;
	myFirstLine.innerHTML = Text;
	mySecondLine.innerHTML = Author;
};

/*
myFirstLine.onclick = function() 
{
	httpGet('www.localhost:8080/api/quote',function(quote){
	console.log(quote);
	var Author = quote.author;
	var Text = quote.text;
	myFirstLine.innerHTML = Text;
	mySecondLine.innerHTML = Author;
	});
};
*/