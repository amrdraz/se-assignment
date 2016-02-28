var express = require('express');
var app = express();
var quotes = require('./quotes');
var router = express.router;

//var express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

router.get('/', function (req, res) {
   quotes.getQuoteFromDB(function(err,quote){
         res.send(quote);
     });
});


