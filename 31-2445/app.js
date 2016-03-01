var express = require('express');
var path = require('path');
//var routes = require('./routes/index');
var app = express();
var quotes = require('./quotes.js')

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

  

app.get('/', function(req, res) {
    // var db = req.db;
    // var collection = db.get('userlist');
    // collection.find({},{},function(e,docs){
        res.send('index.html');
    });

app.get('/index', function(req, res) {
    // var db = req.db;
    // var collection = db.get('userlist');
    // collection.find({},{},function(e,docs){
        res.send('index.html');
    });
app.get('/api/quote',function(req, res){
     quotes.getQuoteFromDB(function (err,quote){
                 res.send(quote); 
     }); 
});

app.get('/api/quotes',function(req, res){
     quotes.getQuotesFromDB(function (err,quote){
           res.send(quote); 
     }); 
});

app.get('/index.html', function(req, res) {
    // var db = req.db;
    // var collection = db.get('userlist');
    // collection.find({},{},function(e,docs){
        res.render('index.html');
    });

 app.use(function(req, res, next) {
     res.status(404).send('Not Found');
 });
module.exports = app;