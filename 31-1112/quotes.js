var db = require('./db');

function getElementByIndexElseRandom(array, index) {
	if (typeof index == "undefined")
	{
		return array[Math.floor(Math.random() * array.length)];
	}
	else 
		return array[index];
}

// console.log(getElementByIndexElseRandom([1,2,3,4], 1));

function getQuotesFromJSON() {
	var fs = require('fs');
	var v = fs.readFileSync('./quotes.json');
	return JSON.parse(v);
}

 console.log(getQuotesFromJSON()); 

function getQuoteFromJSON(index){
	var s = getQuotesFromJSON();
	return getElementByIndexElseRandom(s, index);
}

// console.log(getQuoteFromJSON());

function seed(cb) {
	db.db().collection('c').find().toArray(function(err, array) {
		if (array.length == 0) {
			var d = getQuotesFromJSON();
			db.db().collection('c').insert(d, function() {
				cb(null, true);
			});
		}
		else
			cb(null,false);
	});
}

// db.connect(function() {
// 	seed(function(err, seeded) {
// 		console.log(seeded);
// 	});
// });



function getQuotesFromDB(cb) {
	db.db().collection('c').find().toArray(function(err, array) {
		cb(err, array);
	});
}

// db.connect(function() {
// 	getQuotesFromDB(function(err, seeded) {
// 		console.log(seeded);
// 	});
// });

function getQuoteFromDB(cb ,index){
	getQuotesFromDB(function(err, array) {
		cb(err, getElementByIndexElseRandom(array, index));
	});
}

// db.connect(function() {
// 	getQuoteFromDB(function(err, quote) {
// 		console.log(quote);
// 	});
// });


//exports 
module.exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
module.exports.getQuotesFromJSON = getQuotesFromJSON;
module.exports.getQuoteFromJSON = getQuotesFromJSON;
module.exports.seed = seed;
module.exports.getQuotesFromDB = getQuotesFromDB;
module.exports.getQuoteFromDB= getQuoteFromDB;
