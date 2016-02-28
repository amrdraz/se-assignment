var fs = require('fs');
var dbFile= require('./db.js');
var allQuotes = fs.readFileSync("../quotes.json");
var db;
dbFile.connect(function(err,connectedDB){
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
	db.get('myQuotes').find({},{},function(err,quotesinDB)
	{	

		if (err)
		{
			cb(err,false);
		}
		else if (quotesinDB.length)
		{
			cb(null,false);
		}
		else
		{
			db.get('myQuotes').insert(getQuotesFromJSON());
			cd(null,true);
			
		}
	});

}


var getQuotesFromDB = function getQuotesFromDB(cb) 
{
	//console.log('hi');
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

// seed(function(err,seeded)
// {
// 	console.log(seeded);
// });
exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.seed = seed;
exports.getQuotesFromDB = getQuotesFromDB;
exports.getQuoteFromDB = getQuoteFromDB;
//seed(null);
/*
console.log(getQuotesFromDB(function(err,quotes)
	{
		if (err)
			console.log('%ARAAAAAA');
		else
			console.log('gsdsdgkwe');
	}));*/
