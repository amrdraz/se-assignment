var json = require('../quotes.json');
var mongo = require('mongodb').MongoClient;
var Conn = require('./db.js').connect(function(){ console.log ("Connected!!") });
var DB = require('./db.js').db();


  function getElementByIndexElseRandom(array, index) {
         index = index === undefined ? Math.floor(Math.random() * array.length) : index;
         return array[index];
     }
function getQuotesFromJSON(){
   
     return json;
   }

function getQuoteFromJSON(index){

 return getElementByIndexElseRandom(getQuotesFromJSON(),index);

}




function seed(cb){
    var err;
    var seeded;
    if(DB.collection('inspire').find().count()>0){
    	err = new Error("Error!!");
    	seeded = false;
    }
   else{
     DB.collection('inspire').insertMany(json);
     seeded = true;
     }
     cb(err,seeded);
    
}



exports.getQuotesFromDB = function(cb){
	var quotes;
   DB.collection('inspire').find().toArray(function(err,docs){
   	quotes = docs;
   });
   if(quotes===undefined)
   	err = new Error("Quotes Null!");

   cb(err,quotes);

}

exports.getQuoteFromDB= function(cb ,index){
   var quotes;
   var quote;
   DB.collection('inspire').find().toArray(function(err,docs){
   	quotes = docs;
   });
   if(quotes===undefined)
   	err = new Error("Quotes Null!");
    
    index = index===undefined ? Math.floor(Math.random() * quotes.length):index;
    quote = quotes[index];
   cb(err,quote);

}

module.exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
module.exports.getQuotesFromJSON = getQuotesFromJSON;
module.exports.getQuoteFromJSON= getQuoteFromJSON;
module.exports.seed = seed;