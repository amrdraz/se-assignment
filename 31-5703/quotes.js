var http = require('http');
var fs= require("./quotes.json");
var mongo = require("mongodb").MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var dbUrl = 'mongodb://localhost:27017/db';
var DB; 
mongo.connect ('mongodb://localhost:27017/db', function(err,db)
{
    if (err) throw err; 
    console.log('connected to db')
    DB = db;


});

function seed(){
    
    fs.readFile('./quotes.json', function(err,data)
    {
        console.log(data);
        seed(data);
        
        
    });
}

   getQuotesFromDB: function getQuotesFromDB(cb){
    
    var quotes =DB.collection('quotes').find();
    quotes.each(function(err,doc){
        
      assert.equal(err,null)  ;
      if(doc!= null) {
          console.dir(doc);
      } else{
          cb();
      }
          
           });
        
    };
    
        connect: function connect (cb) {
            mongo,connect(dbUrl, function(err, db){
                
                assert.equal(null, err);
                getQuotesFromDB(db, function(){
                    db.close();
                    
                 });
                 });
        };

function getElementByIndexElseRandom(array , index){
    if (index!=null){
        fs.get(array(index));
    }else {
    fs.get(array (Math.floor(Math.random()*array.length)));
    }
    
}


function getQuotesFromJSON(){
    
    return fs;
}

function getQuoteFromJSON(index){
    getElementByIndexElseRandom(fs,index);
    
}

    var getQuoteFromDB = exports.getQuoteFromDB= function getQuotesFromDB(cb, index){
    var DB = DB.db();
    var array = getQuotesFromDB(function(error,arr){
   var element = getElementByIndexElseRandom(array.index);
    });


}

getQuotesFromDB: function getQuotesFromDB(cb){
    
    var Q = DB.collection('quotes').find();
    Q.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null) {
            console.dir(doc);
            
        }
        else {
            cb();
        }
   });
    
    
}
    
    
    
    
    
    
