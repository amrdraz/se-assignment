
var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var app = express();
var r=require("fs");
var getQuotes=require("quotes.js");


app.use(express.static('./public'));
    //path.join(__dirname, './public')));


app.use('/', routes);

app.get('/api/quotes', function(req, res) {
    var quotes=getQuotes.getQuoteFromJSON();
    res.send(quotes);
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('public/css/style.css', function(req, res) {
   res.sendFile(__dirname + '/public/css/style.css'); 
});

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/db', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}*/


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


/*
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  });*/


module.exports = app;