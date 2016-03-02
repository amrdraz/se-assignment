var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me';

function connect(cb) {
    mongo.connect(dbURL, function(er, db) {
        if(er){
            throw Error('Connection Error!!');
        }
        DB = db;
        cb(db);
    });
};

function db() {
    if (DB === null)
        throw Error('DB Object has not yet been initialized');
    return DB;
};

function clearDB (done) {
    var collection = DB.collection("quotes").remove( {} , function (er , remove){
        if(er){
            throw Error('Error in clear!!');
        }
        done();
    });
};

 exports.connect = connect
 exports.db = db
 exports.clearDB = clearDB