var express = require("express");
var path = require("path");
var db = require("./db");
var favicon = require('serve-favicon');
var logger = require('morgan');
var app = express();
var quotess = require("./quotes");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(logger('dev'));

db.connect(function(db) {
	quotess.seed(function(err, seeded) {
 })
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/quote', function(req, res) {
	var quote = quotess.getQuoteFromDB(function(err, newQuote) {
		res.json(newQuote);
	});
});


app.get('/api/quotes', function(req, res) {
	var quotes = quotess.getQuotesFromDB(function(err, newQuotes) {
		res.json(newQuotes);
	});
});

app.get('/', function(req, res,next) {
res.render("public/index.html");
next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  res.status(404).send("Not found");
	// res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
//  next(err);
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
module.exports = app
