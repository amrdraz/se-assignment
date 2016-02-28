
var db = require('./db');


var getQuotesFromJSON = exports.getQuotesFromJSON = function(){
	var fs = require('fs');
	var data = fs.readFileSync('../quotes.json');
	return JSON.parse(data);
}
//console.log(getQuotesFromJSON());
// var fruits = [  { author: 'Steve Jobs',
//     text: 'The only way to do great work is to love what you do' },
//   { author: 'Zig Ziglar',
//     text: 'If you can dream it, you can achieve it' } ]

// var a = fruits[0].author; 
// console.log(a);

var getElementByIndexElseRandom = exports.getElementByIndexElseRandom = function(array,index){
	if(typeof index == "undefined")
			index = Math.floor(Math.random() * array.length);
	return array[index];
 }

var getQuoteFromJSON = exports.getQuoteFromJSON = function(index) {
	var arr = getQuotesFromJSON();
	return getElementByIndexElseRandom(arr, index);
}



// var b = getQuoteFromJSON();
// console.log(b);

var seed = exports.seed = function(cb){
	db.connect(function (err,database){
    var collection = database.collection('quotes');
    collection.count(function(err,count){
    	if(err)throw err;
    	if (count === 0){
    		collection.insert(getQuotesFromJSON(), function (err, result){
    			if (err) {
    				throw err; 
    			}
    			cb(null, true);
    	});
    	}

    	else cb (null, false);
    });
});
	
	}       

var getQuotesFromDB = exports.getQuotesFromDB = function (cb) {
    db.db().collection('quotes').find().toArray(function (err, docs){
  	if (err) throw err;
  	cb(err, docs);
  	
});
}

var getQuoteFromDB = exports.getQuoteFromDB = function (cb, index) {
  getQuotesFromDB(function(err, docs){
  		cb(err, getElementByIndexElseRandom(docs,index));
	});
}

// seed(function(err, seeded) {
// 	if (seeded) console.log('seeded');
// 	else
// 		console.log('not seeded');
// });

db.connect(function() {
	
});