// JSON. 
var fs = require("fs");
var quotesJson = require('./quotes.json');
var quotesContents = fs.readFileSync('./quotes.json');
var jsonContent = JSON.parse(quotesContents);
// DB.
var db = require('./db.js');

function getRandomNumber()
{
	return Math.floor(Math.random() * 10) + 1
}

exports.getQuotesFromJSON = function()
{
	return jsonContent;
}

exports.getQuoteFromJSON = function(index)
{
	if(index == null)
	{
		return jsonContent[getRandomNumber()];
	}
	else
	{
		return jsonContent[index];
	}
}

/*
getQuoteFromDB(function (err, quote) {
    // any of quote object in the database  
})
getQuoteFromDB(function (err, quote) {
    // is Kevin Kruse assuming it's the first document in the database
    quote.author;  
}, 0)
*/

exports.getElementByIndexElseRandom = function(array ,index) 
{
	if(index == null)
	{
		return array[getRandomNumber()];
	}
	else
	{
		return array[index];
	}
}

exports.seed = function(cb)
{
	// populates the database if its empty
}