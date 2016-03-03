
	var mongo = require('./db.js')

function getElementByIndexElseRandom(array , index){
    if (index === undefined) {
       return array[Math.floor(Math.random()*array.length)];
    }
    else
        return array[index];
}

function getQuotesFromJSON(){
	var db = require('../quotes.json');
	return db;
}


function getQuoteFromJSON(index){
	var db = getElementByIndexElseRandom(getQuotesFromJSON(),index);
	return db;
}

function seed(cb) {
    // seeded is true when quotes are added to the database
    // seeded is false when nothing is added to the db
    mongo.connect(function(err,mdb){
	    var collection = mdb.collection('quote');
	    var data = getQuotesFromJSON();
	    var d = collection.find().toArray(function(err, items) {
	    	if(items.length == 0){
				collection.insert(data, {w:1}, function(err, result) {
					cb(err,true);
				});
	    	}
	    	else
	    		cb(err,false);
	    });
    });
}

function getQuotesFromDB(cb) {
	mongo.connect(function(err,mdb){
	    var collection = mdb.collection('quote');
	    var d = collection.find().toArray(function(err, items) {
	    	cb(err,items);
	    });
    });
}

function getQuoteFromDB(cb,index) {
		mongo.connect(function(err,mdb){
		    var collection = mdb.collection('quote');
		    var d = collection.find().toArray(function(err, items) {
		    	cb(err,getElementByIndexElseRandom(items,index));
		    	});
    		});
	  
}

exports.seed = seed;
exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuoteFromDB = getQuoteFromDB;
exports.getQuotesFromDB = getQuotesFromDB;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;