var express = require('express');
var app = express();
var quoteFunctions=require('./quotes.js');
app.use(express.static(__dirname +'/public'));

app.get('/index', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/quote',function(req,res){
	quoteFunctions.getQuoteFromDB(function(err,data){
		//res.setHeader('Content-Type', 'application/json');
		res.send(data);
	})
});
app.get('/api/quotes',function(req,res){
	quoteFunctions.getQuotesFromDB(function(err,data){
		res.send(data);
	})
});

app.get('*', function(req, res){
  res.status(404).send("Not found");
});

module.exports=app;