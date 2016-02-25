
var mongo = require('mongodb').MongoClient;
var DB;
mongo.connect('mongodb://localhost:27017/app', function (err, db) {
	if(error)
		throw error;
    DB = db;
});


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
	var json = require("../quotes.json");
	
	return json;
}




var getQuoteFromJSON = function getQuoteFromJSON(index)
{
	var jsonArray = getQuotesFromJSON().toArray();

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
	DB.collection("quotes").find().toArray(function(err , result){

		if(err)
			callback(err , null);
		else
			callback(null , result);
	});
}




var getQuoteFromDB = function getQuoteFromDB(callback , index)
{
	var quote;
	DB.collectoin("quotes").find().toArray(function(err , result){

		if(err)
			callback(err , null)
		else
		{
			quote = getElementByIndexElseRandom(result , index);
			callback(null , quote);
		}
	});
} 