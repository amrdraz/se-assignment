var db = require('./db.js');
var data = require('../quotes.json');

function getElementByIndexElseRandom(array ,index){
	if(index==null)
		index = Math.floor(Math.random() * array.length);
	return array[index];
}

function getQuotesFromJSON(){
	return data;
}

function getQuoteFromJSON(index){
	return getElementByIndexElseRandom(data,index);
}

function seed(cb){
	var collection= db.db().collection("quotes");
	collection.count(function(er, seeded) {
		if(seeded == 0)
			collection.insert(data, function(er, result) {cb(er,true)});
 	    else
        	cb(er, false);
	})
}

function getQuotesFromDB(cb){
	db.db().collection("quotes").find({}).toArray(function(er, quotes) {
		cb(er,data)
	})
}

function getQuoteFromDB(cb , index){
	getQuotesFromDB(function(er,quotes){
		if(er)
			cb(er,quotes);
		else
			cb(er,getElementByIndexElseRandom(quotes,index));
	})
}

exports.getElementByIndexElseRandom = getElementByIndexElseRandom
exports.getQuotesFromJSON = getQuotesFromJSON
exports.getQuoteFromJSON = getQuoteFromJSON
exports.seed = seed
exports.getQuotesFromDB = getQuotesFromDB
exports.getQuoteFromDB = getQuoteFromDB