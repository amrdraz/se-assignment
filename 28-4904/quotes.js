// JSON. 
var fs = require("fs");
var quotesJson = require('./quotes.json');
var quotesContents = fs.readFileSync('./quotes.json');
var jsonContent = JSON.parse(quotesContents);
// DB.
var db = require('./db.js');

function getRandomNumber()
{
	return Math.floor(Math.random() * 4) + 1
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

exports.getQuotesFromDB = function () 
{
    db.connect(function(content)
	{
		quotes = content
		return quotes;			
	}); 
}

exports.getQuoteFromDB = function (index) 
{
    db.connect(function(content)
	{
		var jsonContent = JSON.parse(content);
		quote = jsonContent[index];
		return quote;			
	});  
}

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