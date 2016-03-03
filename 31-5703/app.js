// app.js
var db = require('./db.js');
var assert = require('assert');
var express = require('express');
var mongodb = require('mongodb').MongoClient;
var app = express();
var quotes= require('./quotes.js');
var path = require("path");
var DB = null;

mongodb.connect('mongodb://localhost:27017/db', function(err, db) {
    if (err) throw err;
    DB = db;
    var quote = {
        "header": quote.text,
        "body": quote.author
    };
    
});
    
      
        res.send(quote);
          console.log(quote);
        // res.send(quote.author);
        //   console.log(quote.author);
      

    app.getQuoteFromDB(function(err,quote){
      console.log('hii');
      
    


app.use(express.static('./public'));

app.get('/css/style.css', function(req, res) {
   res.sendFile(__dirname + '/public/css/style.css'); 
});



app.get('/api/quotes', function(req, res, next) {
    DB.collection('quotes').findOne(function(err, quotes) {
        if (err) return next(err);
        res.send(quotes);
    });
});
app.get('/index', function(req, res, next) {
    res.render('index.html');
});
app.get('/api/quotes', function(req, res) {
	console.log("quotes");
    quotes.getQuoteFromDB(function(err,q){
        res.json(q);
    });
    app.get('/api/quotes', function(req, res) {
	console.log("quotes");
    x.getQuotesFromDB(function(err,q){
        res.json(q);
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
module.exports = app ;

});











