var DB =require('./db');
//random from the array if index isnt passed
function MathRandom(minimum, maximum) {
     return Math.random() * (maximum - minimum) + minimum;
 }
exports.getElementByIndexElseRandom = function(array, index) {
    if (index === null) {
    return array[parseInt(MathRandom(0,array.length),10)];
    }
    else {
    return array[index]

    }
    
}

//returns all quotes
exports.getQuotesFromJSON = function() {
    var kha = require('../quotes.json');
    return kha;
}

//random quote from quotes.json file if index is not passed
exports.getQuoteFromJSON = function(index) {
    var kha = require('..quotes.json');
    return exports.getElementByIndexElseRandom(kha,index);
    
}

//Populate the database with quotes from quotes.json, seed should call the call back when done with an error, seeded set of arguments.
exports.seed = function(cb) {
    var kha = exports.getQuotesFromJSON();
     DB.connect(function(err,db){
         if (err){
             cb(err,false);
             return ;
         }
         else {
                       var coll = db.collection('quotes');
             coll.find({}).toArray(function(err,data){
                 if (err){
                     cb(err,false);
                 }
                 else{
                     if (!data.length){
                         coll.insert(kha);
                         cb(err,true);
 
                     }
                     else cb(err,false);
                 }
             });
         }
     });
         }

//line reserved



//gets quotes from db
exports.getQuotesFromDB = function(cb) {
    DB.connect(function(err,whatev){
    if (err){
    cb(error);
    }
    else {
    var kha = whatev.collection('quotes');
    var array = kha.find({}).toArray(cb);
}

exports.getQuotesFromDB = function(err, quotes) {
    // any of quote object in the database 
    
}

//calls random quote if no index
exports.getQuoteFromDB = function(cb) {
    
}