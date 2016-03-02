var express = require('express');
var path = require('path');
var db = require('./db');
var quotes = require("./quotes");
var app = express();
db.connect(function(db) {
    quotes.seed(function(er, seeded) {

    });
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/quotes', function(req, res) {
    var quote = quotes.getQuotesFromDB(function(err, qu) {
        res.json(qu);
    })
})

app.get('/api/quote', function(req, res) {
    var quote = quotes.getQuoteFromDB(function(err, qu) {
        res.json(qu);
    })
})
/*
app.get('index', function(req,res){
    res.render("public/index.html");
})

app.get('/', function(req,res){
    res.render("public/index.html");
})

app.get('/index.html', function(req,res){
    res.render("public/index.html");
})*/

app.use(function(req, res, next) {
   res.status(404).send('Not Found');
});

module.exports = app