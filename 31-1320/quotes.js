var malafElAqwalElMa2thoora = require('../quotes.json');
var database = require('./db.js');
var error;

var getElementByIndexElseRandom = function getElementByIndexElseRandom(array, index) 
{
	index = index === undefined ? Math.floor(Math.random() * array.length) : index;
	return array[index];
}
var getQuotesFromJSON = function getQuotesFromJSON()
{
	return malafElAqwalElMa2thoora;
}
exports.getQuoteFromJSON = function getQuoteFromJSON(index)
{
	return getElementByIndexElseRandom(getQuotesFromJSON(),index);
}
exports.seed = function seed(cb)
{
	var DB = database.db();
	DB.collection('quotes').find().count(function(error,count)
	{
		if(count == 0)
		{
			DB.collection('quotes').insertMany(malafElAqwalElMa2thoora,function(error,done)
			{
				if(done)
				{
					cb(error,done);
				}
				else
				{
					cb(error,done);
				}
			}
				)
		}
				else
				{
					console.log('already seeded ya m3alem');
				}						
	}
	);
}
	

var getQuotesFromDB = function getQuotesFromDB(cb)
{
	var DB = database.db();
	DB.collection('quotes').find().toArray(function(err,quotes){
		cb(err , quotes);
	})
}

exports.getQuoteFromDB = function getQuoteFromDB(cb , index)
{
	getQuotesFromDB(function (err , quotes){
		cb(err,getElementByIndexElseRandom(quotes,index));
	})
	
}
exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuotesFromDB = getQuotesFromDB;