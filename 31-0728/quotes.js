

var db = require("./db.js");
var DB ;

db.connect(function(db){
	DB = db;
});

var json = require("../quotes.json");



var getElementByIndexElseRandom = function getElementByIndexElseRandom(array , index)
{
	var result = 0 ;

	if(index === undefined)
		result = Math.floor((Math.random() * array.length));	

	else 
		result = index;

	return array[result];
}



var getQuotesFromJSON = function getQuotesFromJSON()
{
	console.log("hi quotes");
	return json;
}



var getQuoteFromJSON = function getQuoteFromJSON(index)
{
	console.log("hi quote");
	var jsonArray = getQuotesFromJSON();
	console.log();
	var quote = getElementByIndexElseRandom(jsonArray , index);

	return quote;
}



var seed = function seed(callback)
{	
	var json = getQuotesFromJSON();

	DB.collection("quotes").insert(json);

	callback(null , true);
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

	DB.get("quotes").find({} , {} ,function(err , result){
	
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