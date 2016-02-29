
var db = require("./db.js");
var DB = db.db();

var json = require("../quotes.json");



var getElementByIndexElseRandom = function getElementByIndexElseRandom(array , index)
{

	if(index === undefined)
		return array[Math.floor(Math.random() * array.length)];	

	return array[index];
}



var getQuotesFromJSON = function getQuotesFromJSON()
{
	return json;
}



var getQuoteFromJSON = function getQuoteFromJSON(index)
{
	var jsonArray = getQuotesFromJSON();
	var quote = getElementByIndexElseRandom(jsonArray , index);

	return quote;
}



var seed = function seed(callback)
{	
	var json = getQuotesFromJSON();
	var length = json.length;
	DB.get('quotes').count({} , function(err , count){
		if(count === 0)
		{
			DB.get('quotes').insert(json , function(err , seed){
				if(err)
					callback(err,false);
				callback(null , true);
			});
		}
		else
		{
			DB.get('quotes').insert(json , function(err , seed){
					callback(err,false);
			});
		}


	})
	

}



var getQuotesFromDB = function getQuotesFromDB (callback)
{
	DB.get("quotes").find({} , {} , function(err , result){

		if(err)
			callback(err , null);
		else
			callback(null , result);
	});
}



var getQuoteFromDB = function getQuoteFromDB(callback , index)
{	
	getQuotesFromDB(function(err , result){
	
		if(err)
			callback(err , null)
		else
		{	
			var quote = getElementByIndexElseRandom(result , index);
			callback(null , quote);
		}
   });
}



exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.seed = seed;
exports.getQuotesFromDB = getQuotesFromDB;
exports.getQuoteFromDB = getQuoteFromDB;