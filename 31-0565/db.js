var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/quotes';

/**
 * function that connects to the mongodb instance initialized.
 * @{Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
    mongo.connect(dbURL,function(err,result){
    DB = result ;
    cb(err,result);
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
exports.clearDB = function(cb) {
  DB.dropDatabase(function(err,result){
    cb(err,result);
  });


};
