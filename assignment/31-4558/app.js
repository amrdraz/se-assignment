var express = require("express");
var app = express();
var quotes = require('./quotes.js');
var db = require("./db");
var path = require('path');
//var appr = express.Router();


app.use(express.static(path.join(__dirname, 'public')));

//db.connect(function(cb){
//	quotes.seed(function(err, seeded) {
  //});
//});



/*app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});*/

app.get('/api/quote', function(req, res){
	quotes.getQuoteFromDB(function(err, quote){

		res.send(quote);
		//console.log(quote);

	});
	//res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/quotes', function(req, res){

	quotes.getQuotesFromDB(function(err, quote){
		res.send(quote);
	});
	//res.sendFile(__dirname + '/public/index.html');
});





module.exports = app;