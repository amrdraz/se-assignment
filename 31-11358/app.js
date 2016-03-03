var express = require('express');
var app = express();
var db = require('./db.js');
var path = require('path');
var Quote = require('./quotes.js');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// ================================================
// routes
app.get('/index.html', function(req, res){
    console.log('call');
    res.render('index.html');
});

app.get('/index', function(req, res){
    console.log('call');
    res.render('index.html');
});

app.get('/api/quote', function(req, res) {
    Quote.getQuoteFromDB(function(err, quote) {
        res.setHeader('Content-Type', 'application/json');
        if(err) {
            res.status(400).json({ error: 'cannot get quote from db' })
        }
        res.json(quote);
    })
});

app.get('/api/quotes', function(req, res) {
    Quote.getQuotesFromDB(function(err, quotes) {
        res.setHeader('Content-Type', 'application/json');
        if(err) {
            res.status(400).json({ error: 'cannot get quotes from db' })
        }
        res.json(quotes);
    })
});

app.get('/', function(req, res){
    console.log('call');
    res.render('index.html');
});

app.get('*', function(req, res){
  res.send('404, Not Found!', 404);
});

module.exports = app;
