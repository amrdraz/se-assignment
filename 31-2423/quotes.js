var db = require('./db.js');
var assert = require('assert');
var path = require('path');
var fs = require('fs');
var jsonFile = require('../quotes.json');
var jsonArray;

function getElementByIndexElseRandom(array , index){
	if(index == null){
		var rand = array[Math.floor(Math.random() * array.length)];
		return rand;
	}
	else {
		return array[index];
	}
}
exports.getElementByIndexElseRandom= getElementByIndexElseRandom;

function getQuotesFromJSON(){
	return jsonFile;
}
exports.getQuotesFromJSON= getQuotesFromJSON;

function getQuoteFromJSON(index){
	var array = getQuotesFromJSON();
	if(index == null){
		var item = getElementByIndexElseRandom(array, null);
		return item;
	}else{
		return array[index];
	}
}
exports.getQuoteFromJSON = getQuoteFromJSON;

function seed(cb) {
	var array = getQuotesFromJSON();
    db.db().collection('quotes').find({}).toArray(function(err, quote) {
        if (err) 
        	console.log(err);
        if(quote.length == 0){
        	for(i =0; i<array.length; i++){
       			db.db().collection('quotes').insert(array[i], function(err, result) {
         			assert.equal(null, err);
           			assert.equal(1, result.result.n);
           			if(err)
           				cb(err, false);
       			});
    		}
    		cb(err, true);
        }else{
        	cb(err, false);
        }
    });
}
exports.seed = seed;

function getQuotesFromDB(cb){
	db.db().collection('quotes').find({}, {'_id':false,'text':true, 'author':true}).toArray(function(err, quote) {
        if (err) cb(err, null);
        cb(null, quote);
    });
}
exports.getQuotesFromDB = getQuotesFromDB; 

function getQuoteFromDB(cb,index){
	var randomJson;
	if(index==null){
		randomJson  = getQuoteFromJSON(null);
	}else{
		randomJson  = getQuoteFromJSON(index);
	}
	db.db().collection('quotes').find({"text" : randomJson.text.toString()}).toArray(function(err, quote) {
        if (err) cb(err, null);
        cb(null, quote);
    });
}
exports.getQuoteFromDB = getQuoteFromDB;

	
