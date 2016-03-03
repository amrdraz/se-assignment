var db = require('../db.js');
var express = require('express');
var router = express.Router();
var quotesJSON = require('../../quotes.JSON');


var quotes = { getElementByIndexElseRandom: function getElementByIndexElseRandom(array,index) {
        if(arguments.length===1){
        	var random = Math.floor(Math.random()*array.length);
        	return array[random];
        }
        if(arguments.length===2){
        	return array[index];
        }
        else return;
   		},

    	getQuotesFromJSON: function getQuotesFromJSON(){
    	var fs = require('fs');
    	return JSON.parse(fs.readFileSync(__dirname+'/quotes.json'));
    		},

    	getQuoteFromJSON: function getQuoteFromJSON(index){
    		var arr = getQuotesFromJSON();
    	if(arguments.length===1)
    		return getElementByIndexElseRandom(arr, index);

    	else return getElementByIndexElseRandom(arr);
    	},

    	seed: function seed(callback){
    		var db = require('../db.js');
    		var mongo = mongo = ('mongodb');
    		var quotes = require('./quotes.js')
    		var database = db.db();
    		var collection = db.db().collection('quotes').count(function(err,count){
    			if(count===0){
    				db.db().collection('quotes').insert(quotes.getQuotesFromJSON(),function(err,docs){
    					callback(err,true);
    					console.log('inserted');
    					callback(err,true);
    				});
    			}
    			else {console.log('Database ready!');
    				callback(err,false);
    			}
    		});
    	},

    	getQuotesFromDB: function getQuotesFromDB(callback){
    		var db = require('../db.js');
    		var mongo = mongo = ('mongodb');
    		var database = db.db();
    		var collection = db.db().collection('quotes').find(function(err,docs){
    			docs.toArray(function(err,out){
    				callback(err,out); 
    			});
    		});
    	},

    	getQuoteFromDB: function getQuoteFromDB(callback, index){
            var quotes = require('./quotes.js')
    		if(arguments.length===1){
    			quotes.getQuotesFromDB(function (err,out){
    				var obj = quotes.getElementByIndexElseRandom(out);
    				callback(err, obj);
    		});
    		}
    		if(arguments.length===2){
    			quotes.getQuoteFromDB(function (err,out){
    				quotes.getElementByIndexElseRandom(out, index);
    				callback(err, obj);
    			});
    		}
    	}
}


module.exports = quotes;