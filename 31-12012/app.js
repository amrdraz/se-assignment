var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
var quotes = require('./quotes.js');
var db = require('./db.js');
var server = require('./server.js');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

// function count(){
//   return 5;
// }

// var c = count();
// ...


// function count2(cb){
//   var btengan = 5;
//   cb(btengan);
// }

// count2(function(c){
//   ...
// });


db.connect(function(err, db) {
    console.log('connected to db');
    quotes.seed(function (err, seeded) {
      if(seeded)
        console.log('seeded db');
      else console.log('db already seeded');
        // app.listen(3000, function() {
        //     console.log('Example app listening on port 3000!');
        // });
    });
    quotes.getQuotesFromDB(function (err, quotes){
      console.log(quotes);
    });
});




/*
 * GET userlist.
 */
app.get('/quotes', function(req, res) {
  console.log(quotes.getQuotesFromJSON2(1));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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