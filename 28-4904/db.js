var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var DB = null;
var dbURL = 'mongodb://localhost:27017/dbtest';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
    
  MongoClient.connect(dbURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
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

   var findQuotes = function(db, callback) {
   var cursor =db.collection('quotes').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

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