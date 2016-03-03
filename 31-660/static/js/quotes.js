var DB = require ('./db.js');
var fs= require ('fs');

var path = require('path');
var JSONquotes = require('./quotes.json');

function getElementByIndexElseRandom (array, index){
	if (index==undefined)
		return array[Math.floor(Math.random()*array.length)];
	else 
		return array[index];
}

function getQuotesFromJSON(){
	
	return JSONquotes;

}

function getQuoteFromJSON (index){
	var arr = getQuotesFromJSON();
	return getElementByIndexElseRandom(arr, index);
}

function seed (cb){
	DB.db().collection("quotes").count(function (err, length){
		if (err)
			return cb(err);
		if (length!==0){
			cb(null, false)
		}
		else{
			DB.db().collection("quotes").insertMany(getQuotesFromJSON(), function(err, response){
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
		if (err) 
			return cb (err);
		else
			return cb(err, getElementByIndexElseRandom(quotes, index));
	});
}

exports.getElementByIndexElseRandom= getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.seed= seed;
exports.getQuoteFromDB = getQuoteFromDB;
exports.getQuotesFromDB= getQuotesFromDB;


