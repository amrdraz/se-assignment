var db = require('./db');
var quotes = require('../quotes.json');


var getElementByIndexElseRandom = function(arr, index){

	if(index == null)
		return arr[Math.floor(Math.random()*arr.length)];
	else
		return arr[index];
}

var getQuotesFromJSON = function(){

	return quotes;
 }

 var getQuoteFromJSON = function(index){

 	var all_quotes = getQuotesFromJSON();
 	return getElementByIndexElseRandom(all_quotes, index);
 }

var seed = function(cb){

	if(db == null)
       	cb(true,false);
    else
    {
     db.db().collection("quotes").insertMany(quotes);
     cb(false,true);
    }
}

var getQuotesFromDB = function(cb){

	if(db == null)
		cb(true,null);
    else
	  {
	  	var quotes = db.db().collection("quotes").find().toArray(function(err,quotes){
         
         cb(err,quotes);
	  	});
	  }
}
var getQuoteFromDB = function(cb,index){

	getQuotesFromDB(function(err, quotes){

	var quote = getElementByIndexElseRandom(quotes,index);
	cb(false,quote);
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



