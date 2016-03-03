var express = require('express');
var app = express();
var mongo=require('./db.js');
var myFunctions=require('./quotes.js')

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/index', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/css/style.css', function(req, res) {
  res.sendFile(__dirname + '/public/css/style.css');
});

app.get('/js/jquery.min.js', function(req, res) {
  res.sendFile(__dirname + '/public/js/jquery.min.js');
});

app.get('/js/main.js', function(req, res) {
  res.sendFile(__dirname + '/public/js/main.js');
});

app.get('/api/quote', function(req, res) {
   myFunctions.getQuoteFromDB(function(err,quote){
   		res.json(quote); 
   });
});

app.get('/api/quotes', function(req, res) {
   myFunctions.getQuotesFromDB(function(err,quotes){
   		res.json(quotes); 
   });
});

app.use(function(req, res){
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(8080, function () {
  console.log('Inspiring on port 8080!');
});

mongo.connect(function(err){
	console.log('connected to mongodb!!');
	myFunctions.seed(function(err,seeded){
		if(seeded)
			console.log('database seeded!!');
	});
});




