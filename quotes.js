var q = require('./quotes.json');
var db= require('./db.js');


function getElementByIndexElseRandom(array ,index){
	if(index != null){
		return array[index];
	}
	else {
		var a= Math.random()*array.size();
        var b= Math.floor(a);
		return array[b];
	}}

	function getQuotesFromJSON(){
		require('./quotes.json');
}
	function getQuotesFromJSON(index){
		if (index != null) {
			return getElementByIndexElseRandom( q, index);
		}
		else {
			var m = Math.random() * 10;
			m = Math.floor();
			return getElementByIndexElseRandom(q, m);
		}
	}
// var mongo = require('mongodb').MongoClient;
// var DB = null;
// var dbURL = 'mongodb://localhost:27017/inspire-me';

	seed(function (err, seeded) {
		db.db().insert(q,function(err,success){
			if(err != null)
				throw err;
			else{
				seed(function(err,1);
		
			}
			var count= db.db().count();
			if( var == 0){
			db.db().insert(q,function(err,success){
			if(err != null)
				throw err;
			else{
				seed(function(err,1);
			}	
			}
} else{
	function (err, false)
}
	 // mongo.readFile('json/quotes.json', 'utf8', function(err,data)){
 	// if (err) throw err;
 	// console.log(data);
 	// var json= JSON.parse(data);
  //     dbURL.insert( json, function(err,doc){   // dbURL?
  //     	console.log(data);
  //     	if(err) throw err;

      });
//}

//	};
	function getQuotesFromDB(cb){
		var cursor = db.collection('quotes').find();
		cursor.each(function(err,doc){
			assert.equal(err,null);
			if(doc != null){
				console.dir(doc);
			}
			else{
				cb(err, quotes);
			}
			});
	}
		
	function getQuoteFromDB(cb [, index]){}

}