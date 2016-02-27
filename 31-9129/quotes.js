

var fs = require('fs');
var jsonFile=require('../quotes.json');
var db=require('./db.js');
var quotes = require('./quotes.js');
var DB=null;

var getElementByIndexElseRandom = function (array, index)
{
	index = index === undefined ? Math.floor(Math.random() * array.length) : index;
	    return array[index];
}
exports.getElementByIndexElseRandom=getElementByIndexElseRandom;


var getQuotesFromJSON=function ()
{
	return jsonFile;
}
exports.getQuotesFromJSON=getQuotesFromJSON;


var getQuoteFromJSON=function (index)
{	
	return getElementByIndexElseRandom(getQuotesFromJSON(),index);
}
exports.getQuoteFromJSON=getQuoteFromJSON;


exports.seed=function(cb)
{
	DB=db.db();

	DB.collection('quoteApp').find().count(function(err1,count2)
	{
		if(count2==0&&!err1)
		{
				DB.collection('quoteApp').insertMany(jsonFile,function(err2,inserted)
				{
					if(err2)
					{
						cb(err2,false);
					}
					else
					{
						cb(err2,true);
					}
				});
		}
		else
		{
			cb(err1,false);
		}
	});
}

var getQuotesFromDB=function (cb)
{
	DB=db.db();
	DB.collection('quoteApp').find().toArray(function (err,quotes)
	{
		if(err)
		{
			cb(err,null);
		}
		else
		{
			cb(err,quotes);
		}
	});
}
exports.getQuotesFromDB=getQuotesFromDB;

exports.getQuoteFromDB=function(cb,index)
{
	getQuotesFromDB(function(err,quotes)
	{
		if(err)
		{
			cb(err,null);
		}
		else
		{
			var quote=getElementByIndexElseRandom(quotes,index);
			cb(err,quote);
		}
	});
}
