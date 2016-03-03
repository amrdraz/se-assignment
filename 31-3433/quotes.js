var mongo=require('./db.js');

var getElementByIndexElseRandom=function(array, index) {
	if (index===undefined)
		index=Math.floor(Math.random() * array.length);
	return array[index];
}

var getQuotesFromJSON=function(){
	return require('../quotes.json');
}

var getQuoteFromJSON=function(index){
	return getElementByIndexElseRandom(getQuotesFromJSON(),index);
}

var seed=function(cb){
	var quotes=getQuotesFromJSON();
	var DB=mongo.db();
	DB.collection('quotes').insert(quotes,function(err,result){
		if (err){
			cb(err,false);
		} else{
			cb(err,true);
		}
	});
};

var getQuotesFromDB=function(cb){
	var DB=mongo.db();
	DB.collection('quotes').find().toArray(function (err, quotes) {
		if(err)
			throw err;
		else
			cb(null,quotes);
	});
}

var getQuoteFromDB =function(cb,index){
	getQuotesFromDB(function(err,quotes){
		if(err)
			throw err;
		else{
			var quote=getElementByIndexElseRandom(quotes,index);
			cb(null,quote);
		}			
	});
}




exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
exports.getQuotesFromJSON=getQuotesFromJSON;
exports.getQuoteFromJSON=getQuoteFromJSON;
exports.seed=seed;
exports.getQuotesFromDB=getQuotesFromDB;
exports.getQuoteFromDB=getQuoteFromDB;