// db.js
var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/quotes';

/**
* function that connects to the mongodb instance initialized.
* @param  {Function} cb callback for when connection is complete
*/
exports.connect = function(cb) {
  // You do this one
  mongo.connect(dbURL,function(err,db){
    if(!err){
      DB=db;
      console.log("Connected successfully!");
      cb(err,db);
    }
    else {
      console.log(err);
    }
  });
}

/**
* used to get access to the db object to query the database
* throws an error if db not initialized.
* example use case assuming you required the module as db
*     db.db().find(.... etc
* @return {MongoDBObject}
*/
exports.db = function() {
  if (DB === null) throw Error('DB Object has not yet been initialized');
  return DB;
}

/**
* clears all collections in the database calling the callback when done
* @param  {Function} done callback indicating the operation is complete
*/
exports.clearDB = function(done) {
  DB.listCollections().toArray().then(function (collections) {
    collections.forEach(function (c) {
      DB.collection(c.name).removeMany();
    });
    done();
  }).catch(done);
}
