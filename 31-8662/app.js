var express = require('express');
var path = require('path');
//var quotes = require('./quotes.js');
var app = express();
//var main= require('./public/js/main.js')


//app.set('views', path.join(__dirname, './public'));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;

require('./routes/index.js')(app);
