var express = require('express');
var app = express();
var quotes = require("./quotes");
var path = require('path');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next){
	res.render('index');
});

app.get('/api/quote', function(req, res, next){
	quotes.getQuoteFromDB(function(err, quote){
		if(err) throw Error ("Couldn't get qoute.");
		console.log(quote)
			res.json(quote);
	});
});

app.get('/api/quotes', function(req, res, next){
	quotes.getQuotesFromDB(function(err, quotes){
		if(err) throw Error ("Couldn't get qoutes.");
		res.json(quotes);
	});
});

app.use(function(req, res, next){
  res.status(404);
  if (req.accepts('html')) {
    fs.readFile('./public/error-404.html', function (err, file){
                if (err) throw err;
                res.end(file);
            });
    return;
  	}
  });

module.exports = app;