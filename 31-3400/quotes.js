
 var DB = require ('./db.js');

function getElementByIndexElseRandom(array , index) {
	var array=[1,2,3,4];

  if (index == null){
		var random= array[Math.floor(Math.random() * array.length)];
		console.log(array[random]);
	}
	else{
		console.log(array[index]);
	}


}
exports.random = getElementByIndexElseRandom;

//getElementByIndexElseRandom([1,2,3]);

 function getQuotesFromJSON(){
   
   var quotes = require('../quotes.json');
   return quotes;
 
 }

 function getQuoteFromJSON (index){
   var array = getQuotesFromJSON();
   return getElementByIndexElseRandom(array, index);
 }