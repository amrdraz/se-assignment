<<<<<<< HEAD
//importing mongoDB api
var mongo = require('mongodb');
var mongoC = mongo.MongoClient;

//setting our DB url
var url = 'mongodb://localhost:27017/quotes';
//initialize our DB variable
var DB=null;

//Function to connect To DB
// if connected set DB to this db
=======
var mongo = require('mongodb')
var mongoC = mongo.MongoClient

var url = 'mongodb://localhost:27017/quotes'
var DB=null;

>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
function connect(cb) {
    if(DB) cb(null)
    mongo.connect(url, function(err, db) {
        if(err)
            throw Error("Connection failed");
        DB = db;
        cb(db)
    })
}

<<<<<<< HEAD
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
=======
function db() {
    if(DB === null) throw Error('DB Object has not yet been initialized')
    return DB
}

function clearDB(cb) {
    DB.collection('quotes').deleteMany({}, function(err, res) {
        if(err)
            throw err
>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
        cb()
    })
}


<<<<<<< HEAD
// a function to close the connection of our DB
=======
>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
function close(cb){
    if(DB)
        DB.close()
    cb()
}

<<<<<<< HEAD
//exporting stuff
=======
>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
exports.db = db;
exports.connect = connect;
exports.close = close;
exports.clearDB = clearDB;