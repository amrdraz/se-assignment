var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hjs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index')(app);

app.listen(3000, function() {
  console.log("Running !!!");
});

app.use(function(req, res, next) {
    res.render('404.hjs');
});

require('./server').connectToDB(function() {
	console.log('connected to Database');
});

module.exports = app;
