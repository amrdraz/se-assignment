
var express = require('express');
var app = express();
var quotes = require('./static/js/quotes.js');

app.get('/api/quotes' , function(req,res){ 
	var array = quotes.getQuotesFromDB();
	res.send(array);
});

app.get('/api/quote' , function(req,res){

    quotes.getQuoteFromDB(function(err,quote){
    	if(err == null){
    		res.send(quote);
    	}
    });
});

app.use(express.static('./static'));

app.get('*' , function(req,res){ 
	res.sendFile('/home/ibraheem/Assignment/31-10388/static/notFound.html');
});

module.exports = app;