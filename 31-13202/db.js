// db.js
var mongo = require('mongodb').MongoClient;
var DB = null;
var URL = 'mongodb://localhost:27017/dbquote';


/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */

// exports.connect1 = function(err,DB) {
//  	mongo.connect(dbURL,function(err,mydb){
//  	assert.equal(null, err);
//     console.log("Connected correctly to server.");	
//  	DB = mydb;
//  	DB.close();
//  	});
// };
module.exports = {
connect : function(cb) 
{	
	mongo.connect(URL, function (error,db1) 
	{
	    DB = db1;
	    cb();
	});
},
clearDB :function(cbb) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (cb) {
            DB.collection(cb.name).removeMany();   
        });
        cbb();
    }).catch(cbb);
},
db :function() 
{
    if (DB === null) throw Error('DB not initialized');
    return DB;
},

}
/**
 * used to get access to the db object to query the database
 * throws an error if db not initialized.
 * example use case assuming you required the module as db
 *     db.db().find(.... etc
 * @return {MongoDBObject} 
 */
// exports.db = function() {
//     connect(err,db);
//     if (db === null) throw Error('DB Object has not yet been initialized');
//     return db;
// };

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */


// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var url = 'mongodb://localhost:27017/no';
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server.");
//   db.close();
// });

 // module.exports = {
 //  connect : function(err,DB) {
 // 	mongo.connect(dbURL,function(err,mydb){
 // 		if(err){
 // 			throw err;
 // 		}
 // 		DB = mydb;
 // 		DB.close();
 // 	});
 // },