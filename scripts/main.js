var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/dinosaur-icon.png') {
      myImage.setAttribute('src','images/dinosaur2.png');
    } else {
      myImage.setAttribute('src','images/dinosaur-icon.png');
    }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName(){
	var myName = prompt('Please enter your name.');
	localStorage.setItem('name', myName);
	myHeading.textContent = 'Dinosaurs are awesome, ' + myName;
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  var storedName = localStorage.getItem('name');
  myHeading.textContent = 'Dinosaurs are awesome, ' + storedName;
}

myButton.onclick = function() {
  setUserName();
}