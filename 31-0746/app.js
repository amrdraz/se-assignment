

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express=require('express');
// Database
//var mongo = require('mongodb');
//var monk = require('monk');
var db=require("./db");
//var db = monk('localhost:27017/SE_ASSIGN');
var app=express();
var quotes= require("./quotes");
var app = express();
app.use(logger('dev'));
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

db.connect(function(db)
{
    
    quotes.seed(function(err,seeded){

    });
});

app.use(express.static(path.join(__dirname, 'public')));

//var routes = require('./routes/index');
//var users = require('./routes/users');



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());


app.get('/api/quote', function(req, res) 
{
   var quote = quotes.getQuoteFromDB(function(err, quotee) 
   {
       res.json(quotee);
   });
 });

app.get('/api/quotes', function(req, res)
{
    var quote= quotes.getQuotesFromDB(function(err,quotee)
    {
     res.json(quotee);
});
});


/*
 app.get('/', function(req, res,next) {
 res.render("public/index.html");
 next();
 });
*/


// Make our db accessible to our router
/*app.use(function(req,res,next){
    req.db = db;
    next();
});
*/
//app.use('/', routes);
//app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
  //  err.status = 404;
   // next(err);
});
/*
/// error handlers

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
    /*res.render('error', {
        message: err.message,
        error: {}
    });

    
    });

*/
module.exports = app

/*
app.get('/css/style.css', function(req, res) {
   res.sendFile(__dirname + '/static/css/style.css'); 
});
*/