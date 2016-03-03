var mongo = require('mongodb').MongoClient;
//var assert = require('assert');
var DB = null;
var dbURL = 'mongodb://localhost:27017/app';
var quoteFunctions= require('./quotes.js');

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
    console.log("INSIDE DB CONNECT");
    mongo.connect(dbURL, function(err, db) {
      if (err) throw Error("could not connect to db");
      else {
          console.log("We are connected to mongodb");
          DB = db;
          cb(err, db);
      //  quoteFunctions.seed(err,db);
      }
    });
};

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
};

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
};
