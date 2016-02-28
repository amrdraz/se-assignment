var mongo = require('mongodb').MongoClient;
var DB = null;
var monk= require('monk');

var quotes = require('./quotes.js');


exports.connect = function(cb){
DB = monk('localhost:27017/quotes');
cb(DB);
}
////Connects to database then call callback passing db.


exports.db = function ()
   {
    if (DB === null){ 
        this.connect(function(db){
            return DB;

		}); }//throw Error('DB Object has not yet been initialized');
    return DB;
};


//Returns the instantiated db object.

exports.clearDB = function(cb){
    
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
}
