var db = require('./db.js');

function getElementByIndexElseRandom(array , index) {
	if(index !==undefined)
		return array[index];
	else return array[parseInt(Math.random()*array.length)];
}

function getQuotesFromJSON(){
	var json = require('../quotes.json');
	return json;
}

function getQuoteFromJSON(index){
	return getElementByIndexElseRandom(getQuotesFromJSON(),index);
}

function seed(cb) {
    var x = getQuotesFromJSON();
    var data = db.db().get('quotes');
    var seeded= false;
    var error = null;
    data.count({}, function (error, count) {
    	if(count<x.length){
    		seeded = true;
  			x.forEach(function(item,index){
				data.insert(item, function (err, doc) {
  					if(err) error= err;
				});
    		});
  		}
	cb(error,seeded);
	});
};

function getQuotesFromDB(cb){
	var data = db.db().get('quotes');
	data.find({}, function (err, docs){
		cb(err,docs);
	});
}

function getQuoteFromDB(cb , index){
	getQuotesFromDB(function(err,quotes){
    	var quote =  getElementByIndexElseRandom(quotes,index);
    	cb(err,quote);
    });
}

db.connect(function(){
  seed(function (err2, seeded) {
    
    });
});

exports.seed = seed;
exports.getQuotesFromDB = getQuotesFromDB;
exports.getQuoteFromDB = getQuoteFromDB;
exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.getQuotesFromJSON = getQuotesFromJSON;
