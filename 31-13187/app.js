var http = require('http') ;
// var mongo = require('mongodb').MongoClient ; 
var fs = require('fs');
var quotes = require("./quotes.js");
// var uri   = 'mongodb://localhost:27017/test';
//var jquery = require('jquery');
var express = require('express');
//var routes = require('./routes/index');
//var users = require('./routes/users');
var app = express();

app.use(express.static('./public'));
app.get("/api/quote", function (req, res,next) {
	quotes.getQuoteFromDB(function (err ,quote ){
    if(err)
    	console.log("err1");
   else{
   	res.json(quote);
   }
	}


);
});
app.get("/api/quotes", function (req, res,next) {
	quotes.getQuotesFromDB(function (err ,quotes ){
    if(err)
    	console.log("err1");
   else
   	res.json(quotes);
	


});
});
module.exports = app;