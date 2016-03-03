var quotesJSON = require('../quotes.json');
var app = require('./app.js');
var db = require('./db.js');
var DB = db.db();
var getElementByIndexElseRandom = module.exports.getElementByIndexElseRandom = function (array, index){
	if(typeof index === 'undefined'){
		index =Math.random()*(array.length)
		index= Math.floor(index)
	}
	return array[index];
}

exports.getQuotesFromJSON = function (){
	return quotesJSON;
}

exports.getQuoteFromJSON =  function (index){
	if(typeof index === 'undefined'){
		index = Math.floor(Math.random()*quotesJSON.length);
	}
	return quotesJSON[index];
}

exports.seed = function (cb){
	getQuotesFromDB(function(err, quotes){
		if(quotes.length === 102)
			cb(null, false);
		else{
			db.db().collection("quotes").insertMany(quotesJSON, function(err, res){
					if(err){
					cb(err, false)
					}
					else{
					cb(null,true)
					}
				 });
	}
	})

				
		}


	


var getQuotesFromDB = module.exports.getQuotesFromDB = function(cb){
		db.db().collection("quotes").find().toArray(function(err,quotes){
		if(err){
			cb(err,null);
		}
		else{
			cb(null,quotes);
		}
	});

}
exports.getQuoteFromDB = function(cb, index){
	getQuotesFromDB(function(err,quotes){
		var flag = false;
		if(!err){
			cb(null, getElementByIndexElseRandom(quotes,index));
		}
		else
			cb(err,null);
	});
}
