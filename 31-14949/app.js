var express = require('express');
var app =express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = require('./db.js');
var quotes = require('./quotes.js');

app.set('views',path.join(__dirname,'public'));
app.set('view engine','jade');

db.connect(function(db){
 quotes.seed(function(err,seeded){
     if(seeded===true){
     	console.log("quotes inserted successfully");
     }if(err){
     	throw err
     }

 });
 });

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('public/index.html');
});

app.get('/api/quote', function(req, res) {
    var quote = quotes.getQuoteFromDB(function(err, r) {
        if (err) console.log("Cannot fetchany quote from DB at this moment .. Come back later ")
        res.json(r)
    })
});

// catch 404 and forward to error handler


// error handlers

// development error handler
// will print stacktrace

// production error handler
// no stacktraces leaked to user

app.listen(3000,function(req,res){
  console.log('started');
});

module.exports = app;

