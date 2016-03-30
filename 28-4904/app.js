var express = require('express');
var app = express();
var quotes = require("./quotes.js");
var db = require('./db.js');

function getRandomNumber()
{
	return Math.floor(Math.random() * 4) + 1
}

// Adding static public files
app.use(express.static('public'));

// Route to Server.js
var server = require('./server.js');
app.use('/',server);

// Route to Quotes.json
app.get('/api/quotes',function(req, res) 
{
	db.connect(function(content)
	{
		res.send( content );			
	});
});
// Route to Quote
app.get('/api/quote',function(req, res) 
{
 	db.connect(function(content)
	{
		var jsonContent = JSON.parse(content);
		res.send( jsonContent[getRandomNumber()] );			
	});
});

// Error Handling
app.use(function(req, res, next) {
  //res.status(404).send('404 NOT FOUND');
  res.sendfile('./public/error.html', {root: __dirname })
});

app.listen(8080, function () {
  console.log('Motivate Me app listening on port 8080!');
});