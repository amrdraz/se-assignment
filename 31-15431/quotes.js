var mongo = require('mongodb');
var monk = require('monk');
var quo = require('../quotes.json');
var db = new require('./db.js');
db.connect(function(db){

});

var getElementByIndexElseRandom =module.exports.getElementByIndexElseRandom= function(array, index){
	if(index===undefined){
		var  x= Math.floor((Math.random()*array.length));
		return array[x];
	}else{
		var x=array[index];
		return x;
	}
	
}

var getQuotesFromJSON =module.exports.getQuotesFromJSON= function(){
	return quo;
}

var getQuoteFromJSON =module.exports.getQuoteFromJSON= function(index){
	if(index===undefined){
		var  x= Math.floor((Math.random()*quo.length));
		return quo[x];
	}else{
		return quo[index];
	}
}

var seed=module.exports.seed=function(cb){
var d =db.db();
	var collection = d.get('qoutes');
	collection.find({},{},function(err,docs){
		if(err){
			cb(err,false);
		}else{
			if(!docs.length){

				collection.insert(getQuotesFromJSON());
				cb(err,true);
			}else
			cb(err,false);
		}
	});

	
}

var getQuotesFromDB=module.exports.getQuotesFromDB=function (cb ){
	var d=db.db();
		var collection = d.get('qoutes');
	collection.find({},{},function(err,docs){
		cb(err,docs);
	});
	
	
}

var getQuoteFromDB=module.exports.getQuoteFromDB=function (cb , index){
	getQuotesFromDB(function(err,docs){
		if(err){
			cb(err,null);
		}else{
			
			if(index===undefined){
				var x= Math.floor((Math.random()*docs.length));
				cb(err,docs[x]);
			}else{
				if(index>=docs.length)cb(err,null);
				else cb(err,docs[index]);
			}

		}
	});
	
}

// getQuoteFromDB(function(err,doc){
// 	if(err)throw err;
// 	console.log(doc);
// },50);