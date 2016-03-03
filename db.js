var MongoClient = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/assign';

//export. ..

exports.connect = function(cb) {
    // You do this one
    MongoClient.connect(dbURL, function (err, db) {
        //console.log(dbURL);
    	if (err) throw err;
    else {
        console.log('DB connectd');
        DB = db;
        cb(err,db);
	}
    });
};

exports.db = function() {
    if (DB === null) throw Error('DB not initialized!!');
    return DB;
};

exports.clearDB = function(done) {
    DB.collection('quotes').drop();
    done();
  
};