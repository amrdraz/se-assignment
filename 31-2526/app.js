var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var qoutes = require('./qoutes.js');
var DB = require('./db.js');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
DB.connect(function(db){
  qoutes.seed(function(err, seeded){});
});



app.use(express.static(path.join(__dirname)));
app.get('/', function(req,res){
  res.render('/index.html');
});
app.get('/api/qoutes', function(req, res){
  qoutes.getQoutesFromDB(function(err, qoute){
    res.json(qoute);
  });
});

app.get('/api/qoute', function(req, res){
  qoutes.getQouteFromDB(function(err, qoute){
    res.json(qoute);
  });
});
//app.use('/', db);
//app.use('/', routes);
//app.use('/users', users);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// // error handlers
//
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
//
// // production error handler
// // no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//

module.exports = app;
