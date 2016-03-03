var http = require('http');
var fs = require('fs');
var mongo = require('mongodb').MongoClient;
var express = require('express');
var DB;
var assert = require('assert');
var dbUrl = 'mongodb://localhost:27017/mydb';
mongo.connect('mongodb://localhost:27017/mydb', function (err, db) {
      if (err) throw err;
    console.log('connected to db');
    DB = db;
});

var handleRequest = function handleRequest(request, response){
        if (request.url==='/index.html') {
            response.writeHeader(200, {'Content-type':'text/html'});
            fs.readFile('./public/index.html', function (err, file) {
                if (err) throw err;
                response.end(file);
            });
        } else if(request.url==='/quotes') {
        response.writeHeader(200, {'Content-type':'quotes/json'});
        DB.collection('quotes').find().toArray(function (err, quotes) {
            if (err) throw err;
            response.end(JSON.stringify(quotes));
        })
    
        } else {
            response.writeHeader(404);
            response.end('404 Nothing to see here: ' + request.url);
        }
}

function seed(){
        fs.readFile('./quotes.json', function (err, data)
         // data = JSON.parse( data );
        {
            console.log( data )
            seed(data);
        });
}
    // seeded is true when quotes are added to the database
    // seeded is false when nothing is added to the db
seed();

function getElementByIndexElseRandom(array, index){
 //   var a = JSON.parse(array);
    if (index ==null){
    var rand = array[Math.floor(Math.random() * array.length)];
    fs.get(array[rand]);
    
    }
    else{
         fs.get(array[index]);
    }
    
}
function getQuotesFromJSON(){
    return fs;
    // var obj = $.parseJSON('quotes/json').toArray;
    // return obj
}
function getQuoteFromJSON (index){
    getElementByIndexElseRandom(fs, index)
    
}

// function getQuotesFromDB() {
 //var docs= DB.collection.('quotes').find().toArray();
// return docs   
// }
  getQuotesFromDB: function getQuotesFromDB(cb) {
         var quotes= DB.collection('quotes').find();
             quotes.each(function(err, doc) {
             assert.equal(err, null);
            if (doc != null) {
             console.dir(doc);
             } else {
             cb();
      }
   });
};
    connect: function connect(cb) {
        mongo.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
           getQuotesFromDB(db, function() {
      db.close();
  });
});
};
var  getQuoteFromDB = exports.getQuoteFromDB=  function getQuoteFromDB(cb, index){
    var DB= DB.db();
    var a = getQuoteFromDB(function(error,arr){
        var result = getElementByIndexElseRandom(a,index);
        return result;
    })
}
//   getQuoteFromDB: function getQuoteFromDB(cb, index) {
//       var x = Math.random();
//       if(index == null)
//          var quotes= DB.collection('quotes').findOne();
//              quotes.each(function(err, doc) {
//              assert.equal(err, null);
//             if (doc != null) {
//              console.dir(doc);
//              } else {
//              cb();
//       }
//   });
// };
//     connect: function connect(cb) {
//         mongo.connect(dbUrl, function(err, db) {
//             assert.equal(null, err);
//           getQuotesFromDB(db, function() {
//       db.close();
//   });
// });
// };