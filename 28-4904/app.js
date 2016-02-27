var express = require('express');
var app = express();
var quotes = require("./quotes.js");

// Adding static public files
app.use(express.static('public'));

// Route to Server.js
var server = require('./server.js');
app.use('/',server);
app.use('/showquote',server);

// Route to Quotes.json
app.get('/api/quotes',function(req, res) 
{
	var content = quotes.getQuotesFromJSON();
	res.send(content);
});
// Route to Quote
app.get('/api/quote',function(req, res) 
{
 	var content = quotes.getQuoteFromJSON();
	res.send(content);
});

// Error Handling
app.use(function(req, res, next) {
  //res.status(404).send('404 NOT FOUND');
  res.sendfile('./public/error.html', {root: __dirname })
});

app.listen(8080, function () {
  console.log('Motivate Me app listening on port 8080!');
});