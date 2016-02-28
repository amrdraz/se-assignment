var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./db');
var quotes= require('./quotes');

var app = express();

// view engine setup

database.connect(function(database)
{

  quotes.seed(function(err,seeded){
  });
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));


// catch 404 and forward to error handler


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

app.get('/', function(req, res,next) {
res.render("public/index.html");
next();
});

app.get('/api/quote',function(req,res){
  var q= quotes.getQuoteFromDB(function(err,quote){

    res.json(quote);
  });
});
app.get('/api/quotes',function(req,res){
  var qs= quotes.getQuotesFromDB(function(err,quotes){
    res.json(quotes);
  });
});
app.use(function(req, res, next) {
  res.writeHead(404,{'Content-type':'text/html'});
  res.end("404 NOT FOUND");
});
module.exports = app;
