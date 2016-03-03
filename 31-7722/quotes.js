
var fs = require('fs');
var quotes= require('../quotes.json');
var array;
var seeded;
var db= require('./db.js');
var t = require('./quotes.js');
exports.getElementByIndexElseRandom = function(array, index){
	var quote;
	if (index===undefined) {
		quote =array[Math.floor(Math.random()*array.length)];
	} else {
		quote= array[index];
	}
	return quote;

};
//=================================================================================
exports.getQuotesFromJSON = function(){

  //array= quotes;
  return quotes;

};
//=================================================================================
exports.getQuoteFromJSON = function(index){

		return t.getElementByIndexElseRandom( t.getQuotesFromJSON(),index);

};
//=================================================================================
exports.seed = function(cb){
    
    // seeded is true when quotes are added to the database
    // seeded is false when nothing is added to the db

    	db.db().collection('quotes').find().count(function(err, count){
    		if (count==0) {

    		var quotes = t.getQuotesFromJSON();
    		db.db().collection('quotes').insert(quotes, function (err, result) {
    			if (err) {
    				cb(err, false)
    			}else
	    		     cb(err, true)
    		});

    	}
        else{
            cb(err, false);
        }
    });
}
// var x = require('quotes.js');
// x.seed(function(){


// function (err, seeded) {



//=================================================================================
exports.getQuotesFromDB = function(cb){
    // any of quote object in the database  
   db.db().collection("quotes").find().toArray(function(err ,data){
    cb(err,data);
   });

}
//=================================================================================
exports.getQuoteFromDB =function(cb,index){
    // any of quote object in the database  
     db.db().collection("quotes").find().toArray(function(err ,data){
    cb(err,t.getElementByIndexElseRandom(data,index));
   });

   


}


//==================================================================================


