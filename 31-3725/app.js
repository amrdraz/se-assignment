// Dependancies
var express = require('express');
var quotes = require('./quotes');
var app = express();

// Scripts (CSS & JS) directory
app.use(express.static(__dirname + '/public'));

// Home page (serving an HTML file)
app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});

// API endpoints (serving documents in JSON format)
app.get('/api/quote', quotes.find);
app.get('/api/quotes', quotes.findAll);

// Last route
app.get('*', function(req, res) {
  res.send(404);
});

// Exports
exports.app = app;
