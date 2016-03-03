var db=require('./db.js');
var quotesFromJSON =require('../quotes.json');


exports.getElementByIndexElseRandom = function(array,index){
	if(index===undefined)
		index = Math.floor(Math.random() * array.length);

	return array[index];
}


exports.getQuotesFromJSON = function(){

	return quotesFromJSON;
}

exports.getQuoteFromJSON = function (index){
	var quote=exports.getElementByIndexElseRandom(exports.getQuotesFromJSON(),index);
	return quote;
}

exports.seed = function(cb){
	console.log("inside seed");//debugging
	db.db().collection("inspire").count(function (err,i){
		if(i>0){

			cb(err,false);
		}
		else{
			db.db().collection("inspire").insert(quotesFromJSON,function(err2,seeded){
				cb(err,seeded);
			});
			
		}
		
	});
}


exports.getQuotesFromDB = function(cb){
	db.db().collection('inspire').find().toArray(function (err,quotes){
		cb(err,quotes);
	})

}

exports.getQuoteFromDB = function (cb,index){
	db.db().collection('inspire').find().toArray(function (err,quotes){
		var singleRandomQuote = exports.getElementByIndexElseRandom(quotes,index);
		cb(err,singleRandomQuote);

	});


}




