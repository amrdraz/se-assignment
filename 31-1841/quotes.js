//var mongo = require('mongodb');
var quotes = require('./quotes.json');
var database = require("./db.js")
var Database = database.db();
//var Server = mongo.Server,
 //   Db = mongo.Db,
  //  BSON = mongo.BSONPure;

//var server = new Server('localhost', 27017, {auto_reconnect: true});
//db = new Db('inspire-me', server);

/*db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'inspire-me' database");
        db.collection('quotes', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'quotes' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});


exports.findOne = function(req, res) {
    db.collection('quotes', function(err, collection) {
       
 var x = parseInt(Math.random()* (quotes.length));
        
        res.json(quotes[x]);
    });
};
exports.findAll = function(req, res) {
    db.collection('quotes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

var populateDB = function() {
    db.collection('quotes', function(err, collection) {
        collection.insert(quotes, {safe:true}, function(err, result) {});
    });
};*/

var getElementByIndexElseRandom = function getElementByIndexElseRandom(array , index){
    if(index==undefined){
        index =Math.floor(Math.random() * array.length);

    }
    return (array[index]);
}
var getQuotesFromJSON = function getQuotesFromJSON(){
    return quotes;
}
var getQuoteFromJSON = function getQuoteFromJSON(index){
    var thequotes=getQuotesFromJSON();
    var onequote=getElementByIndexElseRandom(thequotes, index);
    return(onequote);
}
var seed = function seed(callback){
    var thequotes=getQuotesFromJSON();
    Database .get('quotes').count({} , function(err , count){
      console.log()
      if(count === 0)
       {
        console.log("djhdjhdjhddhj");
           Database .get('quotes').insert(thequotes , function(err , seed){
               if(err)
                   callback(err,false);
               callback(null , true);
           });
       }
       else
       {
        console.log("jdjhdhdg");
         Database .get('quotes').insert(thequotes, function(err , seed){
                   callback(err,false);
           });
       }
 
 
   })
}
var getQuotesFromDB = function getQuotesFromDB (callback){
    Database .get("quotes").find({} , {} , function(err , result){
 
       if(err)
           callback(err , null);
       else
           callback(null , result);
   });
}

var getQuoteFromDB = function getQuoteFromDB(callback , index)
 { 
   getQuotesFromDB(function(err , array){
   
       if(err)
           callback(err , null)
       else
       {   
           var thequotes = getElementByIndexElseRandom(array , index);
           callback(null , thequotes);
       }
    });
 }
exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
 exports.getQuotesFromJSON = getQuotesFromJSON;
 exports.getQuoteFromJSON = getQuoteFromJSON;
 exports.seed = seed;
 exports.getQuotesFromDB = getQuotesFromDB;
 exports.getQuoteFromDB = getQuoteFromDB; 