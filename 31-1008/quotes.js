
var express = require('express');
//var router = express.Router();
var fs = require('fs');
var DB = require('mongodb');
var database  = require('./db.js');
var db = null;
db = database.db();

//var jsonFile = require('./quotes.json');
//var quotes=[];
//var value="";
//var auth="";

var fs = require('fs');



function getElementByIndexElseRandom(array, index){
    if(index!=null)
    {
        if(index<=array.length)
        return array[index];
        else return null;
    }
    var randomNum=Math.floor(Math.random()*array.length);
             return array[randomNum];
}
module.exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
/*- Given an array returns:
    - A random element from the array If index is not passed.
    - The element in the correct index position if it is.

```js
getElementByIndexElseRandom([1, 3, 4])    // any of 1 3 or 4
getElementByIndexElseRandom([1, 3, 4], 0) // always 1
```*/

function getQuotesFromJSON(){
    //- returns all the quotes as JSON
return JSON.parse(fs.readFileSync('../quotes.json', 'utf8'));
console.log(JSON.parse(fs.readFileSync('../quotes.json', 'utf8'))+"kk");   
}

module.exports.getQuotesFromJSON = getQuotesFromJSON;

function getQuoteFromJSON(index){


var quote = getElementByIndexElseRandom(getQuotesFromJSON(),index);
return quote;

}

module.exports.getQuoteFromJSON = getQuoteFromJSON;
/*- returns a random quote from the quotes.json file if index is not passed else the on int the index position.

```js
getQuoteFromJSON()           // any of quote object in the quotes.json file
getQuoteFromJSON(0).author   // Kevin Kruse*/

//*##### `seed(cb)`

//Populate the database with quotes from quotes.json, seed should call the call back when done with an `error, seeded` set of arguments.

//seeded is a boolean value that is true if the database was empty (and thus seeded) or no error occurred but the database already contains records.

//```js*/
 //function seed(function (){
    

//     fs.readFile('quotes.json', 'utf8', function (err, data) {
// if (err) seeded= false;
// console.log(data);
// var json = JSON.parse(data);
// seeded= true;
// db.configurations.insert(json, function(err, doc) {
//     console.log(data);
// if(err) return seeded= false;
// seeded=true;
// });
// })
 //});
function seed(cb)
{
/*db.createCollection( "quotes",
   {
      validator: { $or:
         [
            { quote: { $type: "string" } },
            { author: { $type: 'string' } },
            ]}}) var quotes = db.getCollection('quotes');
   quotes.insertMany(jsonFile,function(err,seeded)
    {
        if(err)
        {
            cb(err,false);
        }
        else
        {
            cb(err,true);
        }*/

      //db.createCollection('quotes');
        var quotes = db.get('quotes');
console.log(quotes+"sssssaaa");
     var allQuotes  = getQuotesFromJSON();
     quotes.find({},{},function(err,gotQuotes){
      var error = err;
      var seeded = false;

      if(gotQuotes.length==0){
        seeded = true;
        quotes.insert(allQuotes);
      }
      
      cb(error, seeded); 

      
    });
    
}
module.exports.seed = seed; 

//seed();
 function getQuotesFromDB(cb){


     var quotes = db.get('quotes');
       quotes.find({},{},function(err, gotQuotes){
console.log("hii"+gotQuotes);
           cb(err,gotQuotes);
     });
}
module.exports.getQuotesFromDB=getQuotesFromDB;

// - Will call the callback function passed __cb__ with arguments `error, quotes`
//     - error will be null if no error occurred
//     - quotes is a list of all quotes
    

//getQuotesFromDB = module.exports.getQuotesFromDB();
// any of quote object in the database  
// })


function getQuoteFromDB(cb,index){

getQuotesFromDB(function(err, gotQuotes){
var quote = getElementByIndexElseRandom(gotQuotes,index);
       //if(err==null) 
       console.log("hi tany" + quote);
        cb(err,quote);

   });
}
 module.exports.getQuoteFromDB = getQuoteFromDB; 
//module.exports=quotes;
