var fs = require('fs');
var database = require('./db');
var content=require('../quotes.json');
function getElementByIndexElseRandom (array,index){
	switch (arguments.length) {
    case 1:
        return array[Math.floor(Math.random() * (array.length )) ];
        break;
    case 2:
        return array[index];
        break;
    }
}

function getQuotesFromJSON()
{


	return content;
}

function getQuoteFromJSON(index){
	var quotes= getQuotesFromJSON();
	switch(arguments.length){
		case 0:
			return getElementByIndexElseRandom(quotes);
			break;
		case 1:
			return getElementByIndexElseRandom(quotes,index);
			break;
		}

}

function seed(cb)
{


	//var flag2=true;
	database.db().collection('quotes').count(function(err,c){
		if(c!==0)
		{
			cb(err,false);
		}else{
			database.db().collection('quotes').insertMany(content,function(err,res){
					if(err){
						cb(err,false);
					}
					else{
						cb(null,res!==null);
					}

			});
		}
	});




	}



function getQuotesFromDB(cb)
{
	var quotes = database.db().collection('quotes').find().toArray(function(err,docs){
		if(!err)
		{
			cb(null,docs);
		}
	});
}

function getQuoteFromDB(cb,index)
{
	if(index==undefined)
	{
		getQuotesFromDB(
			function(err,docs){
				if(!err){
					cb(null,getElementByIndexElseRandom(docs));
				}
				else{
					cb(err,getElementByIndexElseRandom(docs));
				}
			}
		);
	}
	else{
		getQuotesFromDB(function(err,docs)
		{
			if(!err){
				cb(null,getElementByIndexElseRandom(docs,index));
			}
			else{
				cb(err,getElementByIndexElseRandom(docs,index));
			}
		});
	}
}

exports.getElementByIndexElseRandom = getElementByIndexElseRandom
exports.getQuotesFromJSON = getQuotesFromJSON
exports.getQuoteFromJSON = getQuoteFromJSON
exports.seed = seed
exports.getQuotesFromDB = getQuotesFromDB
exports.getQuoteFromDB = getQuoteFromDB
