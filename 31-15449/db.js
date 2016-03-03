

// db.js
var mongo = require('mongodb').MongoClient;
var DB = null;
// var dbURL = 'mongodb://localhost:27017/inspire-me';
var dbURL = 'localhost:27017/inspire-me';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {

    var monk = require('monk');
    DB = new monk(dbURL);
    cb(null, DB);

};

/**
 * used to get access to the db object to query the database
 * throws an error if db not initialized.
 * example use case assuming you required the module as db
 *     db.db().find(.... etc
 * @return {MongoDBObject}
 */
exports.db = function() {
    if (!DB)
        throw Error('DB Object has not yet been initialized');
    return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.clearDB = function(done) {
    var quotes = DB.get('quotes');
    quotes.remove({}, function (err) {
        done(err);
    });
};
