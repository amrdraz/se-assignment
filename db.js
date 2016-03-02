var MongoClient = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/assign';


/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
    // You do this one
    MongoClient.connect(dbURL, function (err, db) {
        //console.log(dbURL);
    	if (err) throw err;
    else {
        console.log('connected to db');
        DB = db;
        // console.log(DB);
        cb(err,db);
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
    DB.collection('quotes').drop();
    done();
    // DB.listCollections().toArray().then(function (collections) {
    //     collections.forEach(function (c) {
    //         DB.collection(c.name).removeMany();   
    //     });
    //     done();
    // }).catch(done);
};

// connect(function (err, db) {
//     clearr(function() {
//         console.log('ewijfsdklfwsfkn');
//     });
// });