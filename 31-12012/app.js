var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database
var quotes = require('./quotes.js');
var db = require('./db.js');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

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
  //req.db=quotes;
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






// app.js

app.get('/api/quote', function(req, res) {
  var quote =  quotes.getQuoteFromDB(function(err, quote){
      // console.log(quote);
      res.send(quote);
    });
});

app.get('/api/quotes', function(req, res) {
  var quote =  quotes.getQuotesFromDB(function(err, quote){
      // console.log(quote);
      res.send(quote);
    });
});

app.get('*', function(req, res){
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("404 Not Found\n");
  res.end();
})

/*
 * GET userlist.
 */
 //route
// app.get('/quotesMain', function(req, res) {



//   return quotes.getQuotesFromJSON2(1);
// });


//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'productiondevelopment') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;