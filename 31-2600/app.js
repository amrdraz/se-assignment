
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assert= require('assert');

var mongo= require('mongodb').MongoClient;
var monk= require('monk');
var routes = require('./routes/index');

var app = express();

app.get('/api/quote', function(request, response) {
DB.connect(function(err, db) {
quotes.getQuoteFromDB(function(err, quote) {
response.send(quote);
});
});
});
app.get('/api/quote', function(request, response) {
DB.connect(function(err, db) {
quotes.getQuotesFromDB(function(err, quote) {
response.send(quote);
});
 });
});
    
    mongo.connect('mongodb://localhost:3000/db.js',function(error,db){
        if (error)
        throw error;
    DB=db;
    }
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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
    res.render('error', {
        message: err.message,
        error: {}
    });
    app.use(function(req,res,next){
    req.db = db;
    next();
});

});



module.exports = app;

 
