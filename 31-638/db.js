var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me';

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
// You do this one

exports.connect = function(cb) {
    MongoClient.connect('mongodb://localhost:5000/database2', function(err, db) {
      if(!err) {
        DB = db;
        console.log("We are connected");

      }
      cb(err, db)
      console.log("We are connected");



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