var app = express();
var http= require('http');
var fs =require('fs');
var path = require('path');
var quotes = require('./quotes.json')
var db = require ('./db.js');



var myFunc1 = function getElementByIndexElseRandom(array, index) {
	
	if(index === undefined) {
       this.index= Math.floor(Math.random() * array.length)
	}else{
		index;
	}
	// index = index === undefined ? Math.random() * array.length : index;
	
	return array[index];
}




// function getElementByIndexElseRandom (array, index){
// 	if (index==undefined)
// 		return array[Math.floor(Math.random()*array.length)];
// 	else 
// 		return array[index];
// }
// //in main js to generate random value everytime 
// function getQuotesFromJSON() {
// 	//want to take all values of app.js and put it in arraylist
// 	//??????????????????????????The app must serve the data from a mongodb database.
// 	var qArray = [];
// 	fs.readFile("quotes.json", function (err, data) {
//        data = JSON.parse( data );
//        data.users[3] = user;

// }
// }

var myFunc2 =function getQuotesFromJSON(){
	
	return quotes;

}

//get specific quote

var myFunc3 = function getQuoteFromJSON(index){
	var qArray = new Array();
		qArray.push(fs.readFile("quotes.json", function (err, data) )
     //  data = JSON.parse( data );
        getElementByIndexElseRandom(qArray, index)
       
}

var myFunc6 = function getQuoteFromDB(array, index){
	var quotesarray=[];
	quotesarray=getQuotesFromJSON(index);
	getElementByIndexElseRandom(quotesarray, index)
}

 var myFunc5 = function getQuotesFromDB(cb){
   db().collection("quotes").find().Array(function (err, quotes)
}

var myFunc4 = function seed(cb){
	db().collection("quotes").insertAll(getQuotesFromJSON(), function(err, response)
}
//???????????????????????????????



exports.myFunc1 = myFunc1;
exports.myFunc2 = myFunc2;
exports.myFunc3 = myFunc3;
exports.myFunc4 = myFunc4;
exports.myFunc5 = myFunc5;
exports.myFunc6 = myFunc6;




// seed(function (err, seeded) {
//     // seeded is true when quotes are added to the database
//     // seeded is false when nothing is added to the db
// })
// cb error and quote function (err, quotes)


