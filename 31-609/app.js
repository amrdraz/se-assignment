var express = require('express');
var app = express();
var path = require('path');

// view engine setup
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'hjs');

app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index')(app);

var server = app.listen(7000, function() {
  console.log('[OK]');
});

module.exports = app;
