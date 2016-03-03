var assert=require('assert');
var dbFile= require('./db.js');
var express = require('express');
var router = express.Router();
var database;


// router.get('/api/post', function(req, res, next) {
//     database.collection('quotes').findOne(function(err, post) {
//         if (err) return next(err);
//         res.send(post);
//     });
// });

function getElementByIndexElseRandom(array ,index)
{
	if(index === undefined)
	{ 
		var length= array.length;
		var random= Math.floor(Math.random()*length);
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

var getQuoteFromJSON= function(index) 
{
    var quotes= getQuotesFromJSON();
    return getElementByIndexElseRandom(quotes,index);

}  

var seed = function(cb)
{
		dbFile.clearDB(function(err)
		{
			assert.equal(null, err);
        	dbFile.db().collection('quotes').insert(getQuotesFromJSON(), function(err, seeded) {
                if(err)
				{
					cb(err,false);
				}
				else
					cb(err,true);
				
            });

	});
}	
	
var getQuotesFromDB= function(cb)
{
	
	var allQuotes= dbFile.db().collection('quotes').find().toArray(function(err,allQuotes)
	{
		if(!err)
		{
			cb(null,allQuotes);
		}
		else
		{
			cb(err,null);
		}

	});
	
}


var getQuoteFromDB= function(cb ,index)
{
   var allQuotes= getQuotesFromDB(function(err,allQuotes) 
   {
   		if(!err)
   		{	
   			cb(null,getElementByIndexElseRandom(allQuotes,index));
   		}
   		else
   		{
   			cb(err,null);
   		}
   });
}

exports.seed= seed;
exports.getElementByIndexElseRandom= getElementByIndexElseRandom;
exports.getQuoteFromJSON= getQuoteFromJSON;
exports.getQuotesFromJSON= getQuotesFromJSON;
exports.getQuotesFromDB= getQuotesFromDB;
exports.getQuoteFromDB= getQuoteFromDB;

//module.exports=router;
