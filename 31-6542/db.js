var mongo = require('mongodb').MongoClient;
var DB = null;
var monk = require('monk');
var dbURL = 'localhost:27017/inspire-me';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */

exports.connect = function connect(cb) 
{

    DB = monk(dbURL);
    cb(null,DB);
    
};
    // You do this one


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
exports.clearDB = function(done) 
{
    DB.get('myQuotes').drop();
    done();
    

};



