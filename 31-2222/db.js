var mongo = require('mongodb').MongoClient;
var DB = null; //actual instance of the database
var dbURL = 'mongodb://localhost:27017/inspire-me';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function connect(cb) {
    // You do this one
    mongo.connect(dbURL, function(err, db){
    	if(!err){
    		console.log("Database Connected!");
            DB = db;
            cb(null, db);
    	}
    	else{
    		cb(err);
    	}
    });
    //DB = db;
    
   // cb();
}

/**
 * used to get access to the db object to query the database
 * throws an error if db not initialized.
 * example use case assuming you required the module as db
 *     db.db().find(.... etc
 * @return {MongoDBObject} 
 */
exports.db = function db() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
}

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.clearDB = function clearDB(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   //could be just DB.collection(c.name).remove()
        });
        done();
    }).catch(done);
}
