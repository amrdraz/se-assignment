
var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/MyDB';

exports.connect = function(cb){
	mongo.connect(dbURL , function(err,db) { cb(err, db); DB=db; } );
};

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

exports.clearDB = function(cb) {
	if(DB != null){
		DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        cb();
    }).catch(cb);
	}
};

