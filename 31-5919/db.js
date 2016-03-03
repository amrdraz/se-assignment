var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me';

exports.connect = function(cb) {
    if(DB) return cd(null,DB);
    mongo.connect(dbURL, function(err,database){
        if(err) return cb(err);
        DB = database;
        cb(null,DB);
    });
};

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
};