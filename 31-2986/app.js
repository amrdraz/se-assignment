var request = require('supertest');
var express = require('express');
var quotes=require('./quotes.js');
var app = express();


app.use(express.static(__dirname +'/public'));

app.get('/',function(req,res){

	res.sendfile('public/index.html' );

});

app.get('/index',function(req,res){

	res.sendfile('public/index.html' );

});


app.get('/api/quotes',quotes.getQuotes);

app.get('/api/quote', quotes.getAQuote);

app.get('*', function(req, res){

 	res.send(404);

});

exports.app=app;