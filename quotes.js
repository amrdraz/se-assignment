var db = require ('./db.js');
var dbClient;



var fs = require('fs');

var jsonData = require('./quotes.json');

db.connect(function databaseConnected()
{
	dbClient = db.db();
	seed(function(){});
});

function getElementByIndexElseRandom(array,n)
{
	if (n != undefined)
		return array[n];
	else
		return array[Math.floor(Math.random() * array.length)];
};
exports.getElementByIndexElseRandom = getElementByIndexElseRandom;

exports.getQuotesFromJSON = function()
{
	return jsonData;
}


exports.getQuoteFromJSON = function( index)
{
	return getElementByIndexElseRandom(jsonData,index);
};
exports.getQuotesFromDB = function(cb)
{
    var collection = dbClient.collection('quotes');
    collection.find({}).toArray(function(err,result)
    {
    	cb(err,result);
    
    });
};

exports.getQuoteFromDB = function(cb,index)
{
    var collection = dbClient.collection('quotes');
    collection.find({}).toArray(function(err,result)
    {
    	cb(err,getElementByIndexElseRandom(result,index));
    
    });
};




exports.getQuoteFromDB = function(cb,index)
{
    var collection = dbClient.collection('quotes');
    collection.find({}).toArray(function(err,result)
    {
    	cb(err,getElementByIndexElseRandom(result,index));
    
    });
};



function seed(cb)
{

	var col = dbClient.collection('quotes');
	col.find({}).toArray(function(error,data)
	{
		if (error) cb(error,false);
		else if (data.length == 0)
		{
			col.insert(	jsonData,function(err,result)
			{
				if (err) cb(err,false);
				else cb(null,true);
			});
		}
		else
		{
			cb("database is not empty",false);
		}

	});

};



exports.seed = seed;
