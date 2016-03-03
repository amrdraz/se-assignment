var mongo = require('./public/db.js');
var q = require('./quotes.json');

  function getElementByIndexElseRandom(array, index) {
	if (index === undefined)
		index = Math.floor(Math.random() * array.length);
	return array[index];
}

  function getQuotesFromJSON(){
	return q;
}

  function getQuoteFromJSON(index){
	return getElementByIndexElseRandom(getQuotesFromJSON(),index);
}

  function seed(cb){
	var quotes = getQuotesFromJSON();
	var DB = mongo.db();
	DB.collection('quotes').insert(quotes,function(err,result){
		if (err){
			cb(err,false);
		} else{
			cb(err,true);
		}
	});
};

   function getQuotesFromDB(cb){
	var DB = mongo.db();
	DB.collection('quotes').find().toArray(function (err, quotes) {
		if(err)
			throw err;
		else
			cb(null,quotes);
	});
}

   function getQuoteFromDB(cb,index){
	getQuotesFromDB(function(err,quotes){
		if(err)
			throw err;
		else{
			var quote=getElementByIndexElseRandom(quotes,index);
			cb(null,quote);
		}			
	});
}




exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.seed = seed;
exports.getQuotesFromDB = getQuotesFromDB;
exports.getQuoteFromDB = getQuoteFromDB;