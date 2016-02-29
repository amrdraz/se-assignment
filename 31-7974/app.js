var express = require('express');
var path = require('path');
var db = require('./db');
var quotes = require('./quotes');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hjs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index')(app);

app.use(function(req, res, next) {
    res.status(404).render('404.hjs');
});

db.connect(function(err, d) {
	if (err)
		throw err;
	else {
		console.log('connected');
		console.log('tried seeding?');

		quotes.seed(function(err, seeded) {
			if (seeded)
				console.log('seeded succesfully');
			else
				console.log('didn\'t seed');
		});
	}
});

module.exports = app;