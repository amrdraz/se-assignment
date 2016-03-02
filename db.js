// db.js
var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/test';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
    // You do this one
   mongo.connect(dbURL, function(err, db){
    if(err) return cb(err);
    DB = db;
    return cb(null, db);
  
   });
   
};





exports.insert = function(data, cb){
	DB.collection('Cars').insert(data, function(err, records){
		if(err){
      throw err;
     return cb(err);
    }  
     console.log("inserted");

		return cb(null, records);
	});
};


exports.getAllQuotes = function(){
	var docs = DB.collection('Cars').find().toArray();
	return docs;

};

exports.getQuote = function(index){
	var docs = DB.collection('Cars').find().toArray();
	return docs[index];

};
/*function cb(err, db) {
  if(err) throw err;

  DB = db;

}*/
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