var http = require('http');
var fs = require('fs');
var mongo = require('mongodb').MongoClient;
var DB = null;
var express = require('express');
var app = express();
var router = express.Router();
require('./routes')(router);

//var quotes = require('./quotes');

mongo.connect('mongodb://localhost:27017/quotes', function (err, db) {
    console.log('connected to db');
    DB = db;
});


app.use(express.static('public'));


//app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = DB;
    next();
});


app.get('/', function(){
   var cursor =db.collection('quotes').find( );
   cursor.each(function(err, doc) {
      if (doc != null) {
         res.json(doc);

}   });

});
//app.use('/', routes);
app.use('/quotes', router);
var PORT = 8080; 
app.listen(PORT);