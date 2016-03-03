var DB = require ('./db.js');
var fs= require ('fs');

var path = require('path');
var parsedJSON = require('../quotes.json');

function getElementByIndexElseRandom (array, index){
	if (index==undefined){
		max= array.length;
		return array[Math.floor(Math.random()*max)];
	}
	else {
		return array[index];
	}
}

function getQuotesFromJSON(){
	
	return parsedJSON;

}

function getQuoteFromJSON (index){
	var array = getQuotesFromJSON();
	return getElementByIndexElseRandom(array, index);
}

function seed (cb){
	DB.db().collection("quotes").count(function (err, length){
		console.log(length + " first length");
		if (err)
			return cb(err);
		if (length!==0){
			// DB.clearDB();
			cb(null, false)
		}
		else{
			// DB.clearDb();
			DB.db().collection("quotes").insertMany(getQuotesFromJSON(), function(err, response){
				console.log(length +" the new length");
				cb(null, true);
			});
		}
	});
}



function getQuotesFromDB (cb) {
DB.db().collection('quotes').find().toArray(function (err, quotes){
	if (err)
		return cb(err);
	else
		return cb(null, quotes);

});
}

function getQuoteFromDB (cb , index){
	getQuotesFromDB(function(err, quotes){
		if (err) return cb (err);
		return cb(err, getElementByIndexElseRandom(quotes, index));
	});
}


exports.getElementByIndexElseRandom= getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.seed= seed;
exports.getQuoteFromDB = getQuoteFromDB;
exports.getQuotesFromDB= getQuotesFromDB;


