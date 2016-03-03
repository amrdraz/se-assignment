var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var db = require('./db.js');
var routes = require('./routes');
var app = express();
app.set('views', path.join(__dirname, 'public'));
app.set('view engine' , 'hjs' );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// I use a dedicated file for routes .
app.use('/', routes);

db.connect(function (_db){
  // console.log(_db);
  var quotes = require('./quotes.js');
  quotes.seed(function(err,seeded){
  });
});


module.exports = app;
