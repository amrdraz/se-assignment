var db = require("./db.js");
var fs = require('fs');
var json = require("../quotes.json");

/*db.connect(function(err, DB){

});*/ //check on this later. should the error be caught here?

//var Database = db.db();

exports.getQuotesFromJSON = function getQuotesFromJson(){
	return json; //wtf am I doing?
}

exports.getQuotesFromDB = function getQuotesFromDB(cb){
	db.db().collection("inspire-me").find().toArray(function(err,quotes){
		cb(err, quotes);
	});
}

exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(array , index){
	index = index === undefined ? Math.floor(Math.random()* array.length) : index;
	return array[index];
}

exports.getQuoteFromJSON = function getQuoteFromJson(index){
	return exports.getElementByIndexElseRandom(getQuotesFromJSON(), index); //synatx?
}

exports.getQuoteFromDB = function getQuoteFromDB(cb, index){
	
	exports.getQuotesFromDB(function(err, quotes){
		if(!err){
		var quote = exports.getElementByIndexElseRandom(quotes, index);
		cb(err, quote);
	}
	else{
		cb(err, null);
	}
	})
}


/*exports.seed = function(cb){
	if(Database.collection("inspire-me").count()>0){
		cb(null, false);
	}
	else{
		Database.collection("inspire-me").insertMany(json, function(err){
			if(err){
				cb(err, false);
			}
			else{
				cb(err, true);
			}
		});
	}
}*/

exports.seed = function(cb){
	db.db().collection("inspire-me").count(function(err, count){
		if(count>0){
			cb(err, false);
		}
		else{
			console.log("here1");
			db.db().collection("inspire-me").insertMany(json); //check on this
					cb(err, true);
					
				
			}
		
	});
}	

/*exports.seed= function(cb){
	var cb = function(err, seeded){
		if(Database.collection("inspire-me").count()>0){
		console.log(err);
		seeded = false;
	}
	else{
		Database.collection("inspire-me").insertMany(json);
		seeded = true;
	}
	}
}*/


