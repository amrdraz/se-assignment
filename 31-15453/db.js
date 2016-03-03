// db.js
var monk = require('monk');
var mongo = require('mongodb');
var DB = null;
var dbURL = 'localhost:27017/quotesDB';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */


exports.connect = function(cb) {
    DB =  monk(dbURL);
    // console.log(DB);
    cb(DB);

    };


/**
 * used to get access to the db object to query the database
 * throws an error if db not initialized.
 * example use case assuming you required the module as db
 *     db.db().find(.... etc
 * @return {MongoDBObject}
 */
exports.db = function() {
    if (DB === null) throw new Error('db is not initialized');
    return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.clearDB = function(done) {
    DB.get('quotes').remove({});
        done();
};
