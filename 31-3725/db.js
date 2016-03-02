// Dependancies
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var quotes = require('./quotes');

// Declarations
var DB = null;

// Connection URL
var url = 'mongodb://localhost:27017/inspire-me';

// Execute
connect(function(err, db) {

  if (err)
    throw new Error('Cannot connect to database.');

  else {

    quotes.seed(function(err, seeded) {

      if (seeded)
        console.log('Database not found. New database created & populated.');
    });

  }

});

// Connects to database
function connect(cb) {

  MongoClient.connect(url, function(err, db) {
    DB = db;
    cb(err, db);
  });

};

// DB getter
function db() {

  if (DB === null)
    throw Error('DB Object has not yet been initialized.');

  return DB;

};

// Drops the database
function clearDB(done) {

  mongoose.connect('mongodb://localhost/inspire-me', function() {
    mongoose.connection.db.dropDatabase();
  });

  done();

};

// Exports
exports.db = db;
exports.connect = connect;
exports.clearDB = clearDB;
