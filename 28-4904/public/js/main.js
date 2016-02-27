// Code for detecting button click
var myFirstLine = document.getElementById("FirstLine");
var mySecondLine = document.getElementById("SecondLine");

myFirstLine.onclick = function() 
{
	myFirstLine.innerHTML = " Quote Goes Here! ";
	mySecondLine.innerHTML = " Author Name Here! ";
	//window.location.replace("http://localhost:8080/showquote");
};