var db = require('./db.js')
var fs = require('fs');


var  getElementByIndexElseRandom = exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(array, index){
	if (index==null){
		var element = array[Math.floor(Math.random()*array.length)];
		return element;
	}else{
		var element =array[index];
		return element;
	}
}
  

var getQuotesFromJSON = exports.getQuotesFromJSON = function getQuotesFromJSON(){
	var file = fs.readFileSync('../quotes.json','utf8');
	var array = JSON.parse(file);
	return array;
} 


var  getQuoteFromJSON = exports.getQuoteFromJSON = function getQuoteFromJSON(index){
	var file = fs.readFileSync('../quotes.json','utf8');
	var array = JSON.parse(file);
	if (index==null){
		return getElementByIndexElseRandom(array, null);
	}else{
		return getElementByIndexElseRandom(array, index);
	}
}


var seed = exports.seed =function seed(cb){
		
		db.connect();
		var DB = db.db();
		var array = getQuotesFromJSON();
		if (DB.Collections("quotes").count()>0)
		{
			seeded = true;
			cb(null,seeded);
		}else{
			seeded = false;
		    DB.Collections("quotes").insertMany(array,function(error,inserted){
			if(error)
				console.log(error);
				cb(error,seeded);  });
	        }
		
}

//quotes is a list of all quotes
var getQuotesFromDB= exports.getQuotesFromDB= function getQuotesFromDB(cb){
	var DB = db.db();
	DB.connect();
	if (DB.Collections("quotes").count()>0)
		{
			DB.Collections("quotes").find.toArray(function(error,quote){
			console.log(quote);
			cb(null,quote);
			return quote;});
			
		}else{
			DB.Collections("quotes").find.toArray(function(error,quote){
			cb(error,null);
			console.log(error);
			return quote; });
	        }
	// DB.Collections("quotes").find.toArray(function(error,quote){
	// 	console.log(quote);
	// 	cb(error,quote);
	// 	return quote;
	}



//random quote document returned from the database
var getQuoteFromDB= exports.getQuoteFromDB= function getQuotesFromDB(cb,index){
var DB= db.db();
var array = getQuotesFromDB(function(error,arr){
if (!error== null)
	var element = getElementByIndexElseRandom(array,index);
	cb(null,element);
	return element;
else cb(error, null);
});
// var element = getElementByIndexElseRandom(array,index);
// return element;
}


