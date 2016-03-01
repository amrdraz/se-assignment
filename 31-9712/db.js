//importing mongoDB api
var mongo = require('mongodb');
var mongoC = mongo.MongoClient;

//setting our DB url
var url = 'mongodb://localhost:27017/quotes';
//initialize our DB variable
var DB=null;

//Function to connect To DB
// if connected set DB to this db
function connect(cb) {
    if(DB) cb(null)
    mongo.connect(url, function(err, db) {
        if(err)
            throw Error("Connection failed");
        DB = db;
        cb(db);
    })
}

//just a getter function
function db() {
    //This condition is just for ensuring that we will not return a NULL var
    if(DB === null) {
        throw Error('DB Object has not yet been initialized')
    }else{
        return DB
    }

}

//a function to clear our DB
function clearDB(cb) {
    DB.collection('quotes').remove({}, function(err, res) {
        if(err)
            throw err;
        cb()
    })
}


// a function to close the connection of our DB
function close(cb){
    if(DB)
        DB.close()
    cb()
}

//exporting stuff
exports.db = db;
exports.connect = connect;
exports.close = close;
exports.clearDB = clearDB;