var db = require("./db.js");
var quotes = require("../quotes.json");

db.connect(function(err, database){
	if (err) throw Error("Unable to connect to db");
	else{
		console.log("Connected to database!");
		seed (function(err, seeded){
		if (err)
			throw Error("Couldn't seed.");
		else if (seeded)
			console.log("Quotes are added to database.");
		else
			console.log("Nothing's added to database.");
		});
	}
});


var getElementByIndexElseRandom = function(array, index){
	if(index !== undefined)
		return array[index];
	else
		return array[Math.floor(Math.random() * array.length)];
}

var getQuotesFromJSON = function() {
	return quotes;
}

var getQuoteFromJSON = function(index) {
	return getElementByIndexElseRandom(quotes, index);
}
 
var seed = function(cb){
	db.db().collection('quotes',function(err, collection){
		collection.count(function(err, count){
			console.log(count);
			if (err) return cb(err, false);
			else if (count !== 0)
				return cb(null, false);
			else{
				var quotesFromJSON = getQuotesFromJSON();
				if (quotesFromJSON.length === 0)
					return cb (null, false);
				else{
					quotesFromJSON.forEach(function(quote){
						collection.insert(quote);
					});
					cb(null, true);
				}
			}
		});
	});
}

var getQuotesFromDB = function(cb) {
    db.db().collection('quotes', function(err, collection){
    	collection.find().toArray(cb);
    });
}

var getQuoteFromDB = function (cb ,index){
getQuotesFromDB(function(err, quotes) {
var quote =getElementByIndexElseRandom(quotes, index);
cb(err, quote);
	});
}

module.exports = {
	getElementByIndexElseRandom: getElementByIndexElseRandom,
	getQuotesFromJSON: getQuotesFromJSON,
	getQuoteFromJSON: getQuoteFromJSON,
	seed: seed,
	getQuotesFromDB: getQuotesFromDB,
	getQuoteFromDB: getQuoteFromDB
}