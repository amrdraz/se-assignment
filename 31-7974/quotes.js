var server = require('./server.js');
var db = require('./db.js');

var getElementByIndexElseRandom = function(arr, index) {
	if (typeof(index) == "undefined")
		index = Math.floor(Math.random()*arr.length);

	return arr[index];
}

var getQuotesFromJSON = function() {
	var fs = require('fs');
	var docs = fs.readFileSync('../quotes.json');
	return JSON.parse(docs);
}

var getQuoteFromJSON = function(index) {
	return getElementByIndexElseRandom(getQuotesFromJSON(), index);
}

var getQuotesFromDB = function(cb) {
	db.db().collection('quotes').find().toArray(function(err, docs) {
		cb(err, docs);
	});
}

var getQuoteFromDB = function(cb, index) {
	db.db().collection('quotes').find().toArray(function(err, docs) {
		cb(err, getElementByIndexElseRandom(docs, index));
	});
}

module.exports = {
	getElementByIndexElseRandom : getElementByIndexElseRandom,
	getQuotesFromJSON : getQuotesFromJSON,
	getQuoteFromJSON : getQuoteFromJSON,
	getQuotesFromDB : getQuotesFromDB,
	getQuoteFromDB : getQuoteFromDB
};
