var MongoClient = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me'; // tells which mongod to connect to 
var assert = require('assert');
Server = require('mongodb').Server;


var mongoclient = new MongoClient(new Server("localhost", 27017)); // Initialize connection once
var connect = exports.connect= function connect(cb){
  MongoClient.connect(dbURL, function(err, database){
    if(err){
      console.log(err); 
    }else{
      DB = database;
      if(!cb==null){
        cb(DB);
      }
      console.log("we are connected");}
  });
} 

exports.db = function db() {
    connect();
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
    // returns database engine
};

exports.clearDB = function clearDB(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
};