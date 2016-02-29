var MongoClient = require('mongodb').MongoClient;
var DB = null;
var url = 'mongodb://localhost:27017/inspire-me';

// function connect(cb) {
//
//   }
//
//   function db() {
//     connect(function(err, db) {
//       if (!err)
//         return db;
//     });
//   }
//
// function clearDb(cb){
//   connect(function(err, db) {
//     if (!err){
//       db.collection('quotes').deleteOne(function(err, results) {
//         console.log(results);
//         return cb(err,results);
//       });
//     }
//
//   });
// }
//
// clearDb(function(err,results){
//
// });





/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
var connect = function(cb) {
  MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        DB = db;
        console.log("Connected to db completed ;)");
      }
      return cb(err, db);
    });
};

/**
 * used to get access to the db object to query the database
 * throws an error if db not initialized.
 * example use case assuming you required the module as db
 *     db.db().find(.... etc
 * @return {MongoDBObject}
 */
var db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
var clearDB = function(done) {
    db().listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();
        });
        done();
    }).catch(done);
};
 module.exports = {
   connect: connect,
   db:db,
   clearDB:clearDB
 }
