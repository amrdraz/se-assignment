var fs = require('fs');
var dbFile= require('./db.js');
var allQuotes = fs.readFileSync("../quotes.json");
dbFile.connect();
var db = dbFile.db();
//var app=require('./app');
var getElementByIndexElseRandom = function getElementByIndexElseRandom(array , index)
{
		if(index === undefined)
		{
			var l = array.length;
			var randomN = Math.floor(Math.random() * l);
			return array[randomN];
		}
    		
    	else
    		return array[index];
}


var getQuotesFromJSON = function getQuotesFromJSON()
{
	 
	return JSON.parse(allQuotes);
}

var getQuoteFromJSON = function getQuoteFromJSON(index)
{
	var retrievedQuotes = getQuotesFromJSON();
	return getElementByIndexElseRandom(retrievedQuotes, index);
}

var seed = function seed(cb)
{
	//var db = express.db;
	
	db.myQuotes.insert()(JSON.parse(allQuotes))

}
seed(null);
	/*
	var myQuotes = db.get('Quotes');
	/*
	console.log('hi'+myQuotes.find());
	myQuotes.insert({ "username" : "testuser1", "email" : "testuser1@testdomain.com" });
	console.log(myQuotes.find().pretty());
}
/*
var getQuotesFromDB = getQuotesFromDB(cb) 
{

}
var getQuoteFromDB = getQuoteFromDB(cb [, index])
{

}*/
exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
//seed(null);
//console.log(getQuoteFromJSON());*/
