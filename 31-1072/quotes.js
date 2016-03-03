var quotes = require('../quotes.json');
var db = require('./db.js');

function getElementByIndexElseRandom(array , index){
	if (index == null){
		var random= Math.floor(Math.random()*array.length);
		console.log(array[random]);
		return array[random];
	}
	else{
		console.log(array[index]);
		return array[index];

	}

}


function getQuotesFromJSON(){
	var quotes = require('../quotes.json');
	return quotes;
}



function getQuoteFromJSON(index){
	var quotes= require("./quotes");
	var array = getQuotesFromJSON();
	if(arguments.length ===1){
		return quotes.getElementByIndexElseRandom(array);
	}
	else{
	return quotes.getElementByIndexElseRandom(array,index);
	}
	
}


function seed(cb){

	
	var data = db.db();
	data.collection('quotes').count(function(err,count)
		{
      if(count==0){
				var dbquotes = getQuotesFromJSON();
				for(i=0;i<dbquotes.length;i++)
				{
					data.collection('quotes').insertOne(dbquotes[i]);
				}
				cb('DB is now populated',true);
			}
			else {

				cb('DB is already full',false);
			}
		});
}

function getQuotesFromDB (cb) {
db.db().collection('quotes').find().toArray(function (err, quotes){
	if (err)
		return cb(err);
	else
		return cb(null, quotes);

});
}

function getQuoteFromDB (cb,index){
	var quotes= require("./quotes.js");
	quotes.getQuotesFromDB(function(err, quotes){

		if (err) 
			return cb (err);
		else
			return cb(err, getElementByIndexElseRandom(quotes, index));
	});
}



	  



exports.getElementByIndexElseRandom= getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.seed= seed;
exports.getQuoteFromDB = getQuoteFromDB;
exports.getQuotesFromDB= getQuotesFromDB;

// function getQuotesFromJSON(){
// 	function getArray(){
//     return $.getJSON('./quotes.json');
// }

// getArray().done(function(json) {
    
//     var quotes = [];
//     $.each(json, function(key, val) {
//         quotes[key] = { Text: val.Text };
//         console.log(quotes);
       
//     });
// });

// }

// function getQuotesFromJSON(cb){
//     $.getJSON("./quotes.json", function(json) {
//         var myArray = [];
//         $.each(json, function() {   
//             myArray.push(json);
//         });
//         cb(myArray);
//     });
// }

// getQuotesFromJSON(function(array) {
//     //your array is available here
//     console.log(array);
// });






// function getQuoteFromJSON([index]){
// }

// function seed(cb){
// }

// function getQuotesFromDB(cb){
// }

// function getQuoteFromDB(cb [, index]){
// }

