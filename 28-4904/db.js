var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var dburl = 'mongodb://localhost:27017/app';
var assert = require('assert');
var DB;

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function()
{
   mongo.connect(dburl, function(err, db) 
   {
   assert.equal(null, err);
   DB = db;
   //findQuotes();
   console.log("Connected correctly to server.");
   });  
};

var findQuotes = function() 
   {
    var cursor = DB.collection('quotes').find();
    cursor.each(function(err, doc) 
    {
      assert.equal(err, null);
      if (doc != null) 
      {
        console.log(doc);
        //return doc;
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
exports.db = function() 
{
  if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.clearDB = function(done) 
{
    DB.listCollections().toArray().then(function (collections) 
    {
      collections.forEach(function (c) 
      {
         DB.collection(c.name).removeMany();   
      });
      done();
    }).catch(done);
};