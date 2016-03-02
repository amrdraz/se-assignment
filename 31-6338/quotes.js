var data = require('fs');
var MongoClient = require('mongodb').MongoClient;
var db = require("./db.js");



function getElementByIndexElseRandom(array, index) {
   if (index === undefined){
    index = Math.floor(Math.random()*array.length);	
	}
	
	return array[index];
    }



function getQuotesFromJSON(){

var x = require('../quotes.json');
return x;
}
function getQuoteFromJSON(index){
var x = require('../quotes.json');
for (i = 0; i < x.length; i++) {
var author = (x[i].author);
var text = (x[i].text);
}
return getElementByIndexElseRandom(x, index)
}




function seed(cb) {
	db.connect(function(err,db){
  var collection = db.collection('quotes');
  var quoteText = getQuotesFromJSON();
collection.count({}, function(err, docs) {
if (docs > 0){
  cb(err,false);
}
else{
    collection.insert(quoteText, function(err, result) {});
    cb(err,true);
  
}
  });

});

}



function getQuotesFromDB(cb) {
        db.connect(function(err,db){
        var quoteText = db.collection('quotes');
        quoteText.find().toArray(function(err, quoteText) {
          cb(err,quoteText);
          });    
      });

}

function getQuoteFromDB(cb , index){
    
          db.connect(function(err,db){
          var quoteText = db.collection('quotes');
          quoteText.find().toArray(function(err, items) {
          
          cb(err,getElementByIndexElseRandom(items,index)); 
      

            });
          
      });    
}


exports.seed = seed;
exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromJSON = getQuoteFromJSON;
exports.getQuoteFromDB = getQuoteFromDB;
exports.getQuotesFromDB = getQuotesFromDB;