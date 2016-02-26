var fs = require('fs');
var dbFile= require('./db.js');
var allQuotes = fs.readFileSync("../quotes.json");
var db;
dbFile.connect(function(connectedDB){
	db=connectedDB;
});

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
	
	db.myQuotes.insert()(JSON.parse(allQuotes),function(err,seeded)
	{
		if (err)
			cb(err,true);
		else
			cb(null,false);
	});

}


var getQuotesFromDB = getQuotesFromDB(cb) 
{
	db.get('myQuotes').find({},{},function(err,quotes)
	{
		if (err)
		{
			cb(err,null);
		}
		else
		{
			cb(null,quotes);
		}
	});
}
/*
var getQuoteFromDB = getQuoteFromDB(cb [, index])
{

}*/
exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
//seed(null);
//console.log(getQuoteFromJSON());*/
