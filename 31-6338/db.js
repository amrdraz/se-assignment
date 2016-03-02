var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire';


/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
// Connect to the db
mongo.connect('mongodb://localhost:27017/inspire', function(err, db) {
  //DB=db;
  //cb(err,DB);

  // if(!err) {
  //   cb(null,db);
  //   console.log("We are connected");
    
  // }
  DB = db;
  cb(err,DB);
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
   // console.log("db start");
    //if (DB === null)
    // connect(function(err,DB){});
      //throw Error('DB Object has not yet been initialized');
    //return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
module.exports.clearDB = function(done) {
  // console.log("cleardb start");
  // console.log(DB);
  //   DB.listCollections().toArray().then(function (collections) {
  //       collections.forEach(function (c) {
  //           DB.collection(c.name).removeMany();   
  //       });
  //       done();
  //   }).catch(done);
  

};
