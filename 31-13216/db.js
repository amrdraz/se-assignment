
var mongo = require('mongodb');
var client = null;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me';
var monk = require('monk');

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
    DB = monk(dbURL);
    client = new mongo.MongoClient(new mongo.Server("localhost",27017));
    cb();
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

//changed the function to clear quotes collection only since its the only collection in there anyway and 
//this is not working for some kind of reason neither with MongoClient nor with monk in here.
exports.clearDB = function(done) {
    DB.get('quotes').remove();
    done();
};