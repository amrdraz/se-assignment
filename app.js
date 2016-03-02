
var http    = require('http');
var fs      = require('fs');
// var api     = require('/api.js');
var quotes  = require('./quotes.js');
var db = require('./db.js');
var express = require('express');


app = express();



app.use(express.static(__dirname + '/public'));


app.get('/api/quote',function(req, res) {
    quotes.getQuoteFromDB(function(err,quote){
    	res.send(quote);
    });
});

app.get('/api/quotes',function(req, res) {
    quotes.getQuotesFromDB(function(err,quote){
        res.send(quote);
    });
});

app.get("*",function(req,res){
    res.status(404).send('Not found');

});

exports.app=app;

