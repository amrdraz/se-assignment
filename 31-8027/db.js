// db.js
var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/db';


exports.connect = function(cb) {
    // You do this one
 
  mongo.connect(dbURL, function(err, db) {
   /* if (!err) {*/
    DB = db;
    cb(err,DB);
/*}
else
    cb(err,DB); 
  });*/

});
}


exports.db = function() {

    if (DB === null) 
        throw Error('DB Object has not yet been initialized');
    return DB;
};


module.exports.clearDB = function(done) {
   
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
};

