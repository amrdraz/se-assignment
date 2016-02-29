var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'hjs');

app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index')(app);

module.exports = app;
