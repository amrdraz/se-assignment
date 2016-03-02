var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var quotes = require('./quotes.js');

var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api",function(req,res,next){
  req.quotes = quotes;
  next();
});

app.use('/', routes);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


module.exports = app;
