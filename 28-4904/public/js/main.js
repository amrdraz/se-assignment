// Writing Code for detecting button click
var myFirstText = document.getElementById("FirstLine");
var mySecondText = document.getElementById("SecondLine")

myFirstText.onclick = function() 
{
	myFirstText.innerHTML = " Quote Goes Here! ";
	mySecondText.innerHTML = " Author Name Here! ";
}