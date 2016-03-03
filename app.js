var express = require('express');
var app = express();
var file = require('./quotes.js');
var mongodb = require('mongodb').MongoClient;
var assert = require('assert');
var db = require('./db.js');
var DB = null;
var quotes = require('./quotes.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/index', function(req, res, next) {
    res.render('index.html');
});

app.get('/', function(req, res, next) {
    res.render('index.html');
});


app.use(express.static('./public'));


app.get('/api/quote', function(req, res) {
	
    quotes.getQuoteFromDB(function(err,qu){
        if(err) return null;
        res.json(qu);
    });
});
app.get('/api/quotes', function(req, res) {
	
    quotes.getQuotesFromDB(function(err,qu){
        if(err) return null;
        res.json(qu);
    });
});



app.get('/api/quote', function(req, res) {
    var post = {
        "title": "live freeeee",
        //"content": "This post's body text was populated with JavaScript"
    }
    res.send(post)
});
// app.use(express.static('./public'));

// app.get('/api/quote2', function(req, res) {
//     var post = getq,
//         //"content": "This post's body text was populated with JavaScript"
//     }
//     res.send(post)
// });

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
