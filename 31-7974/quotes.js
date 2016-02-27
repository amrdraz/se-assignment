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

// db.connect(function(err, d) {
// 	getQuoteFromDB(function(err, quote) {
// 		var json = JSON.parse(quote);
// 		console.log(json);
// 	});
// });

var seed = function(cb) {
	db.db().collection('quotes').find().toArray(function(err, docs) {
		if (docs.length == 0) {
			console.log('empty');
			var fs = require('fs');
			fs.readFile('../quotes.json', 'utf8', function (err, data) {
				if (err) 
					throw err;
				var json = JSON.parse(data);

				db.db().collection('quotes').insert(json, function(err, doc) {
					if(err)
						throw err;
					cb(err, true);
				});
			});
		}
		else {
			console.log('not empty');
			cb(err, false);
		}
	});
}

module.exports = {
	getElementByIndexElseRandom : getElementByIndexElseRandom,
	getQuotesFromJSON : getQuotesFromJSON,
	getQuoteFromJSON : getQuoteFromJSON,
	getQuotesFromDB : getQuotesFromDB,
	getQuoteFromDB : getQuoteFromDB,
	seed : seed
};
