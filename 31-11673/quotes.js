var db = require('./db.js');

function getElementByIndexElseRandom (array, index) {
	if (typeof(index) == "undefined"){
		rand = Math.floor(Math.random()*array.length);
		return  array[rand];
	}

	else
		return array[index];
};

// function d() {

// }

function getQuotesFromJSON  () {
	var x = require('fs');
	var docs = fs.readFileSync('./quotes.json');
	return JSON.parse(docs);
};


function getQuoteFromJSON (index) {
	return getElementByIndexElseRandom(getQuotesFromJSON(), index);
};



function seed (cb) {
	db.db().collection('quotes').find().toArray(function(err, docs) {
		if (docs.length==0) {
			var data = getQuotesFromDB();
			db.db.collection('quotes').insert(data);
			cb(err,true);
		};
		cb(err,false);
	}
};



function getQuotesFromDB (cb) {
	db.db().collection('quotes').find().toArray(function(err, docs) {
		cb(err, docs);
	})};


function  getQuoteFromDB (cb, index) {
	db.db().collection('quotes').find().toArray(function(err, docs) {
		cb(err, getElementByIndexElseRandom(docs, index));
	});
};


module.exports = {
	getElementByIndexElseRandom : getElementByIndexElseRandom,
	getQuotesFromJSON : getQuotesFromJSON,
	getQuoteFromJSON : getQuoteFromJSON,
	seed : seed,
	getQuotesFromDB : getQuotesFromDB,
	getQuoteFromDB : getQuoteFromDB	
};

