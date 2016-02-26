// db.js
var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
        mongo.connect(dbURL, function(err, db) {
            if(err)
              throw Error("Error while Connecting");
            DB = db;
            // console.log("Connected correctly to database" + db);
            cb(db);
       });
}

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
exports.clearDB = function(done) { //edited
  var collection = DB.collection("quotes").remove( {} , function (err , remove){
    if(err )throw err;
    // console.log('DB cleared');
    done();
  } );
};
