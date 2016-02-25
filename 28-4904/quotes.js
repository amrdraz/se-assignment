var fs = require("fs");
var quotesJson = require('./quotes.json');
var quotesContents = fs.readFileSync('./quotes.json');
var jsonContent = JSON.parse(quotesContents);

var db = require('./db.js');
db.connect();

exports.getRandomNumber = function()
{
	return Math.floor(Math.random() * 10) + 1
}

exports.getQuotesFromJSON = function()
{
	return jsonContent;
}

exports.getQuoteFromJSON = function(index)
{
	return jsonContent[index];
}

exports.getQuotesFromDB = function(cb)
{

}

exports.getQuoteFromDB = function(cb ,index)
{

}

exports.getElementByIndexElseRandom = function(array ,index) 
{

}

exports.seed = function(cb)
{

}