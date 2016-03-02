var express = require('express');
var app = express();
var db = require('./db.js');
var quotes = require('./quotes.js');
//require('./app.js')(app)
app.use(express.static('./public'));

app.get('/api/quotes', function(req, res){
	quotes.getQuoteFromDB(function(err, quote){
		if(err) res.end(err);
		res.json(quote);
	});
});
db.connect(function(err, db){
	if(err) console.log("No db")
		console.log("db connected");
	quotes.seed(function(err, seeded){
		if(err) throw err;
		console.log("seeded: " + seeded);
	});
});

app.listen(9000);
	console.log("connected");

exports = exports.module = app;