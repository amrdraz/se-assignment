var mongo=require('./db.js');

function getElementByIndexElseRandom (array, index)
{
	index = index === undefined ? Math.floor(Math.random() * array.length) : index;
	return array[index];
}

function getQuotesFromJSON (){

	var data=require("../quotes.json");
	return data;


}

function getQuoteFromJSON (index)
{
	var data=require("../quotes.json");

	return getElementByIndexElseRandom(data,index);


}

function seed (cb)
{	mongo.connect(function(err1,db1){
	var db= mongo.db;
	var seeded=false;
	var collection= db().collection('quotes');

	//TODO seeded mystery!
	collection.findOne({}, function(err0, result) {

		if (!result) {
			collection.insert(getQuotesFromJSON(), function(err,data){
				if(!err)
				seeded=true;
				cb(err,seeded);
			});

		}
		else
		{
			seeded=false;
			cb(err0,seeded);
		}
	});
});
}

function getQuotesFromDB (cb)
{
	var db 			= mongo.db;
	var collection	= db().collection('quotes');
	collection.find({}).toArray(function(err,result){
		cb(err,result);
	});
}
function getQuoteFromDB (cb, index)
{
	getQuotesFromDB(function(err,result){
		cb(err,getElementByIndexElseRandom(result,index));

	});

}
exports.seed=seed;
exports.getQuoteFromDB=getQuoteFromDB;
exports.getQuotesFromDB=getQuotesFromDB;
exports.getQuoteFromJSON=getQuoteFromJSON;
exports.getQuotesFromJSON=getQuotesFromJSON;
exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
