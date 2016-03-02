var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var api = require('./routes/api');
var quotes = require('./quotes.js');
var app = express();
var cons = require('consolidate'); //dy gdeeda
// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',function(req,res,next){
  req.db = quotes;
  next();
});

app.use('/', routes);
app.use('/api', api);


//da el gedeed

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
//da el gedeed

// catch 404 and forward to error handler
app.use( function(req, res, next) {
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
