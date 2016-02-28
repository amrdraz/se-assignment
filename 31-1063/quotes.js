var dbjs = require('./db.js');

var getElementByIndexElseRandom = function(array , index){
	if(typeof index === 'undefined'){
		index = Math.floor((Math.random() * array.length)); 
	}
	return array[index]	;
}

var getQuotesFromJSON = function(){
	var qJN = require ('../quotes.json');
	return qJN ;
}

var getQuoteFromJSON = function(index){
	
	return getElementByIndexElseRandom(getQuotesFromJSON() , index);
}

var seed = function(cb)
{
	//mongoimport -d test -c quotes.json
	//mongoimport --db test1 --collection collectionTest  --type json --file ../quotes.json --jsonarray ;
	//var mc = require('mongodb').MongoClient;
	dbjs.connect(function(err, db) {
		if(err){
				console.log('error: ', err);
				cb(err,false); //seeded = false;
			}
		else {	
				//use 'inspire-me';
				var array = getQuotesFromJSON();
				var collect = dbjs.db().collection('quotes');
				var collectArray = collect.find();
				if(collectArray.length!=0){
					cb(null,true); //seeded = true;
					//return;
				}
				else{
						
						collect.insert(array);
						cb(null,true);//seeded = true
					}
			}
	} ); 
    	
    
}

var getQuotesFromDB  = function(cb){
		return dbjs.db().collection('quotes');
	}

var getQuoteFromDB = function (cb,index){
	return getElementByIndexElseRandom(getQuotesFromDB() , index);		
	}

exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.seed = seed;
exports.getQuotesFromDB = getQuotesFromDB ;
exports.getQuoteFromDB = getQuoteFromDB;