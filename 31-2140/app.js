var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var api = require('./routes/api');
var app = express();
var quotes = require('./quotes.js');
var mdb = require('./db.js');

// view engine setup
// app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'jade');

var cons = require('consolidate');
// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',function(req,res,next){
      req.db = quotes;
      next();
});

app.use('/', routes);
app.use('/index', routes);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(err.status);
  res.render('error', {
    status : err.status,
    message: err.message,
    error: err.stack
  });
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       status : err.status,
//       message: err.message,
//       error: err.stack
//     });
//   });
// // }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//   	status : err.status,
//     message: err.message,
//     error: err.stack
//   });
// });


module.exports = app;
