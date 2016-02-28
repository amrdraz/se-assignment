
var connection = require('./db.js');
var quotesjson = require("../quotes.json");


function getElementByIndexElseRandom(array , index)
{


	index = index === undefined ? Math.floor(Math.random()*array.length) : index;

	return array[index];
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
function getQuotesFromJSON()
{


 return quotesjson;


}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
function getQuoteFromJSON(index)
{

 return getElementByIndexElseRandom(getQuotesFromJSON(),index);



}

//------------------------------------------------------------------------------------------------------------------------------------------------------------
function getQuoteFromDB(callback,index){


connection.connect(function(db){
db.collection('quotes').find().toArray(function(err, quotes){  index = index === undefined ? Math.floor(Math.random()*quotes.length) : index;


setTimeout(callback(err,quotes[index]),5000);
return quotes[index];
});
});
} 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
function getQuotesFromDB(callback){


connection.connect(function(db){

db.collection('quotes').find().toArray(function(err, array){  
  console.log(array);

setTimeout(callback(err,array),10000);

return array;
 



});
});
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------



function seed(callback){  


connection.connect(function(db){
var fs = require('fs');
var mydocuments = fs.readFile('../quotes.json', 'utf8', function (err, seeded) {
var collection = db.collection('quotes');
collection.insert(JSON.parse(seeded), function(err, docs) { 
collection.count(function(err, count) {  
  console.log("Seeding succeed");

        setTimeout( callback(err,seeded),5000);
        });
    });




});
});
} 


//---------------------------------------------------------------------------------------------------------------------------------------------------------------


exports.getQuoteFromJSON = getQuoteFromJSON;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromDB = getQuoteFromDB;
exports.getQuotesFromDB = getQuotesFromDB;
exports.seed = seed;