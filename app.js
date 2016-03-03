var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db')
var q = require('./quotes')
//var main = require('./public/main');

var app = express();
app.use(express.static('./public'));
// view engine setup

db.connect(function(db) {

	q.seed(function(err, seeded) {

	})

});

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

app.get('/api/quote', function(req, res) {

var quote = q.getQuoteFromDB(function(err, newQuote) {
	res.json(newQuote);

	});
});


app.get('/api/quotes', function(req, res) {

	var quotes = q.getQuotesFromDB(function(err, newQuotes) {
	res.json(newQuotes);

	});
});

app.get('/', function(req, res,next) {
res.render("public/index.html");
next();
});



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next){
    res.status(404);

	 res.send('404', "404 ERROR! Page Not Found .. Inspired By Walid");
	 return;

});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
