var express = require('express');
var router = express.Router();
var db = require("./db.js");
var array = require('../quotes.json');

var q = require("./quotes.js");

// Functions =============================================================
 /*   A random element from the array If index is not passed.
    The element in the correct index position if it is.
*/

exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(a , index){
	var element;
	if(typeof index != "undefined"){		
		 element= a[index];
	}
	else{	
		element = a[Math.floor(Math.random()*a.length)];

	}
return element;

};
//========================================================================

/*returns all the quotes as JSON
as a whole object
*/

exports.getQuotesFromJSON = function getQuotesFromJSON(){
	var parsedData = array;
	return parsedData;

};
//========================================================================
/*returns a random quote from the quotes.json file if index 
is not passed else the on int the index position.
*/
exports.getQuoteFromJSON = function getQuoteFromJSON(index){

	var quotes = q.getQuotesFromJSON();
	var element = q.getElementByIndexElseRandom(quotes , index); //in case index is undefined handled in getElementByIndexElseRandom
	return element;
};

//=======================================================================
/*Populate the database with quotes from quotes.json,
 seed should call the call back when done with an error, seeded set of arguments.*/

 exports.seed = function seed(cb){
     var collection = db.db().collection("quotes");
     collection.count( function ( err , c) { //check thier count
       if(c ==0)
         collection.insert(array , function(err, result) {
         	cb(err,true)
         });
        else
            cb(err, false);
      });
  };
 //=========================================================================
 /*Will call the callback function passed cb with arguments error, quotes
error will be null if no error occurred
quotes is a list of all quotes*/

exports.getQuotesFromDB = function getQuotesFromDB(cb){
 	db.db().collection("quotes").find().toArray(function(err, data) {
 		cb(err, data);
 	});	

};

//=========================================================================
/*Will call the callback function passed cb with arguments error, quote
error will be null if no error occurred
quote should contain a random quote document returned from the database
Optional argument index if present will select a specific quote by index from the quotes documents returned.*/

 exports.getQuoteFromDB = function getQuoteFromDB(cb,index){
 	q.getQuotesFromDB(function (err, data) {

 	cb(err,q.getElementByIndexElseRandom(data, index));	
 });
}

//======================================================================
