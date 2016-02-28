var express = require('express');
var path = require('path');
var tDB = require('./db.js')
var routes = require('./routes/index');
var quot = require('./routes/quote.js');
var app = express();
var quoteF = require('./quotes.js');

tDB.connect(function (err,db){
  quoteF.seed(function (err,seeded){
    console.log(seeded);
  })
});
// view engine setup
app.use(express.static('public'));
app.use(express.static('views'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', quot);

module.exports = app;
