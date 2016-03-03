var quotes = require("../quotes.json");
var Database = require("./db.js");

exports.getElementByIndexElseRandom = function(array, index)
{
	if(index === undefined)
		index = Math.floor(Math.random()*array.length);
	return array[index];
}

exports.getQuotesFromJSON = function()
{
	return JSON.parse(quotes);
}

exports.getQuoteFromJSON = function(index)
{
	var quotes = getQuotesFromJSON();
	return getElementByIndexElseRandom(quotes, index);
}

exports.seed = function(cb){
	Database.db().collection("inspire-me").count(function (err, count){
		if(count > 0){
			cb(err, false);
		}
		else{
			Database.db().collection("inspire-me").insertMany(quotes);
			cb(err, true);
		}
	});
}

exports.getQuotesFromDB = function(cb) {
    Database.db().collection("inspire-me").find().toArray(function(err,quotesArray)
    {
    	cb(err,quotesArray);
    });
}

exports.getQuoteFromDB = function(cb, index)
{
	 Database.db().collection("inspire-me").find().toArray(function(err,quotesArray)
	 {
	 	var randomQuote =  exports.getElementByIndexElseRandom(quotesArray, index);
	 	cb(err,randomQuote);
	 });
}

