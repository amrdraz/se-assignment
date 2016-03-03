var express = require('express');
 var path = require('path');
 var favicon = require('serve-favicon');
 var logger = require('morgan');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 var app = express();

 
 
var route = express.Router();



 var DB = require("./db.js");

 
 DB.connect(function(db){
   var thequotes = require('./quotes');
   thequotes.seed(function(err , seeded){

       });
   app.use(function(req,res,next){
     req.db = db;
     next();
   });
 });


 
 
 var routes = require('./route');
 app.use('/', routes);
 
 
 
 app.set('views', path.join(__dirname, 'public'));
 app.set('view engine', 'hjs');
 
 
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));
 
 
 
 
 
 
 
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
    res.status(err.status || 404);
     res.render('error', {
       message: err.message,
       error: err
     });
   });
 }
 
 // production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 404);
   res.render('error', {
     message: err.message,
     error: {}
   });
 });
 
 
 module.exports = app;
