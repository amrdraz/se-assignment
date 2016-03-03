var dbURL = 'mongodb://localhost:27017/quotesdb';
var qjson = require('../quotes.json');
var db = require('./db.js');

exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(array , index){
	if (index === undefined){
		return array[Math.floor(Math.random() * array.length)];
	}
	return array[index];
}

exports.getQuotesFromJSON = function getQuotesFromJSON(){
	return qjson;

}

exports.getQuoteFromJSON = function getQuoteFromJSON(index){
	//if (index == undefined)
	//	return exports.getElementByIndexElseRandom(exports.getQuotesFromJSON());
	return exports.getElementByIndexElseRandom(exports.getQuotesFromJSON(), index);
}

exports.seed = function seed(cb){
	db.db().collection('quotesdb').count(function(err, count){
	if(count > 0){
		cb(err, false);
	}
	else {
		db.db().collection('quotesdb').insertMany(qjson);
		cb(err, true);
	}
});
}

exports.getQuotesFromDB = function getQuotesFromDB(cb){
	db.db().collection('quotesdb').find().toArray(function(err, quotes){
		cb(err,quotes);
	});
}

exports.getQuoteFromDB = function getQuoteFromDB(cb , index){
	//exports.getQuotesFromDB(function(err, quotes){
		db.db().collection('quotesdb').find().toArray(function(err, quotes){
		var q = exports.getElementByIndexElseRandom(quotes, index);
		cb(err, q);
	});
		
}


