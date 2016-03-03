var quotesJSON = require('../quotes.json');
var app = require('./app.js');
var db = require('./db.js');
var DB = null;

var getElementByIndexElseRandom = module.exports.getElementByIndexElseRandom = function(array, index){
	if (typeof index === 'undefined'){
		return array[Math.floor(Math.random()*array.length)];
	}
	else{
		return array[index];
	}
}

var getQuotesFromJSON =  module.exports.getQuotesFromJSON = function(){
	return quotesJSON;
}

var getQuoteFromJSON = module.exports.getQuoteFromJSON = function(index){
	return getElementByIndexElseRandom(quotesJSON, index);
}

var seed = module.exports.seed = function(cb){
		db.db().collection('quotesList').insertMany(quotesJSON,function(err){
			if(err){
				console.log(err);
				cb(err, false);
			}
			else{
				console.log('inserted quotes')
				cb(null, true)
			}
		});
}

var getQuotesFromDB = module.exports.getQuotesFromDB = function(cb){
	db.db().collection('quotesList').find().toArray(function(err, quotes){
		if (!err){
			cb(null,quotes);
		}
		else{
			cb(err, null);
		}
	});
}

var getQuoteFromDB = module.exports.getQuoteFromDB = function(cb, index){
		db.db().collection('quotesList').find().toArray(function(err, array){
			var quote = array[Math.floor(Math.random() * array.length)];
		cb(null, quote);
		});
		
}


//console.log(getQuoteFromJSON(3));