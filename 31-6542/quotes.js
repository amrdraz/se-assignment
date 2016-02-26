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
	
	db.get('myQuotes').insert(JSON.parse(allQuotes),function(err,seeded)
	{
		if (err)
			cb(err,false);
		else
			cb(null,true);
	});

}


var getQuotesFromDB = function getQuotesFromDB(cb) 
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

var getQuoteFromDB = function getQuoteFromDB(cb , index)
{
	getQuotesFromDB(function(err,quotesArr)
	{
		if (err)
			cb(err,null);
		else
			cb(null,getElementByIndexElseRandom(quotesArr,index));
	});
}
/*
seed(function(err,seeded)
{
	console.log(seeded);
});*/

exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.seed = seed;
exports.getQuotesFromDB = getQuotesFromDB;
exports.getQuoteFromDB = getQuoteFromDB;
//seed(null);
//console.log(getQuoteFromJSON());*/
