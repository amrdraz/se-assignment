// db.js
var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
    // You do this one
    mongo.connect(dbURL,function(error , db ){
        if (error)
            throw Error("error happened");
        DB=db;
        console.log('connected succesfully');
        cb(db);


    });
};

/**
 * used to get access to the db object to query the database
 * throws an error if db not initialized.
 * example use case assuming you required the module as db
 *     db.db().find(.... etc
 * @return {MongoDBObject} 
 */
exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.clearDB = function(done) { //edited
  var collection = DB.collection("quotes").remove( {} , function (err , remove){
    if(err )throw err;
    // console.log('DB cleared');
    done();
  } );
};
// var cursor = collection.find({});
// cursor.each(...);

// exports.clearDB = function(done) {
//     console.log(DB.getCollectionNames().toArray());
//     DB.getCollectionNames().toArray().then(function (collections) {
//         console.log("khlyyy");

//         collections.forEach(function (c) {
//             DB.collection(c.name).removeMany();   
//         });
//         done();
//     }).catch(done);
// };

//This is how your tests/quotes.js should look like

// tests/quotes.js

// var assert = require('chai').assert;
// var app = require('../app.js');
// var request = require('supertest');
// var Quote = require('../quotes.js');
// var db = require('../db.js');

// before(function(done) {
//     // use this after you have completed the connect function
//     // db.connect(function(err, db) {
//     //    if (err) return done(err);
//     //    else done();
//     // });
// });


