var assert=require('assert');
var dbFile= require('./db.js');
var express = require('express');
var router = express.Router();
var database;

function getElementByIndexElseRandom(array ,index)
{
	if(index === undefined)
	{ 
		var random= Math.floor(Math.random()*array.length);
		return array[random];
	}
	else
	{
		return array[index];
	};
};

var getQuotesFromJSON= function()
{
	return require('../quotes.json');
}

exports.getElementByIndexElseRandom = getElementByIndexElseRandom;

var getQuoteFromJSON= function(index) 
{
    var quotes= getQuotesFromJSON();
    return getElementByIndexElseRandom(quotes,index);


}

 



