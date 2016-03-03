var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/quotedb';
/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
    if(DB) return cd(null, database);
     mongodb.connect(dbURL, function(err, database) {
            if(err) return cd(err);
            DB = database;
            cb(null, DB);
        });
}

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

exports.clearDB = function(done) {
  // console.log(DB.listCollections().toArray());
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
          
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
};