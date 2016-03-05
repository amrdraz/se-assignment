var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var DB = null;
var dbUrl = 'mongodb://localhost:27017/inspire-me';

exports.connect = function(cb) {
   mongodb.connect(dbUrl, function(err, db) {
      if(!err) {
        console.log("We are connected to mongodb");
            
             DB = db;
             cb(err, db);
      }else{
        cb(err, null);
      }
    });
}; 
exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};
exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).remove({}, function(){});   
        });
        done();
    }).catch(done);
};
