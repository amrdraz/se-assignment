//connect(cb)
//db()
//clearDb(cd)
//API
///api/quote
///api/quotes
// db.js
//var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me';


//var post = {
  //  "header": "Title added with JavaScript From DB",
    //"body": "This post's body text was populated by sending a get request to /api/post"
//};
/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
/*var DB = {
     seed: function seed(cb) {
        DB.clear(function(err) {
            assert.equal(null, err);
            DB.db().collection('post').insert(post, function(err, result) {
                assert.equal(null, err);
                assert.equal(1, result.result.n);
                cb(err);
            });
        });
    },*/

exports.connect = function(cb) {
    if(DB) return cb(null, database);
     mongodb.connect(dbURL, function(err, database) {
            if(err) return cb(err);
            DB = database;
            cb(null, DB);
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


//module.exports = DB;
