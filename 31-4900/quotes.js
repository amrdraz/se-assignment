var db = require('./db');
function getElementByIndexElseRandom (array, i) {
	if (typeof(i) == "undefined"){
		randomNo = Math.floor(Math.random()*array.length);
		return  array[randomNo];
	}

	else
		return array[i];
};

function getQuotesFromJSON (){
var fs = require('fs');
var quotesdoc = fs.readFileSync('../quotes.json');
return JSON.parse(quotesdoc);
};
function getQuoteFromJSON(i){
	if (typeof(i) == "undefined"){
		return getElementByIndexElseRandom(getQuotesFromJSON());
	}
	else
	{
		return getElementByIndexElseRandom(getQuotesFromJSON(),i);
	}
};
function seed (cb) {
db.db().collection('quotes').find().toArray(function(err, quotesdoc){
	if(quotesdoc.length==0)
	{
		var data = getQuotesFromJSON();
		db.db().collection('quotes').insert(data);
		cb(err,true)
	}
	else
		cb(err,false);
});
}

function getQuotesFromDB(cb) {
	db.db().collection('quotes').find().toArray(function(err, quotesdoc){
		cb(err,quotesdoc);
	});
};

function getQuoteFromDB(cb , i){
	if (typeof(i) == "undefined"){

        db.db().collection('quotes').find().toArray(function(err,quotesdoc){
		cb(err , getElementByIndexElseRandom(quotesdoc));
	});
    }

	else
	{
	db.db().collection('quotes').find().toArray(function(err,quotesdoc){
		cb(err , getElementByIndexElseRandom(quotesdoc,i));
	});
}
};

db.connect(function(err,db){
	getQuoteFromDB(function(err,seeded) {
		console.log(seeded);
	});
});
module.exports = {
	getElementByIndexElseRandom : getElementByIndexElseRandom,
	getQuotesFromJSON : getQuotesFromJSON,
	getQuoteFromJSON : getQuoteFromJSON,
	seed : seed,
	getQuotesFromDB : getQuotesFromDB,
	getQuoteFromDB : getQuoteFromDB	
}