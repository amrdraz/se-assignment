var mongo = require('mongodb')
var mongoC = mongo.MongoClient

var url = 'mongodb://localhost:27017/quotes'
var DB=null;

function connect(cb) {
    if(DB) cb(null)
    mongo.connect(url, function(err, db) {
        if(err)
            throw Error("Connection failed");
        DB = db;
        cb(db)
    })
}

function db() {
    if(DB === null) throw Error('DB Object has not yet been initialized')
    return DB
}

function clearDB(cb) {
    DB.collection('quotes').deleteMany({}, function(err, res) {
        if(err)
            throw err
        cb()
    })
}


function close(cb){
    if(DB)
        DB.close()
    cb()
}

exports.db = db;
exports.connect = connect;
exports.close = close;
exports.clearDB = clearDB;