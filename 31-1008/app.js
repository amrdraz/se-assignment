
var path = require('path');
var logger = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var express = require('express');
var app = express();
var appr = express.Router();
var q = require('./quotes.js');
app.set('views', path.join(__dirname, 'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', appr);



appr.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
appr.get('/index', function(req,res){
	res.sendFile(path.join(__dirname+'/public/index.html'));
})
appr.get('/index.html', function(req,res){
	res.sendFile(path.join(__dirname+'/index.html'));
});


appr.get('/api/quote',function(req,res){
	q.getQuoteFromDB(function(error, quote){
		res.json(quote);
	});
});

appr.get('/api/quotes',function(req,res){
	q.getQuotesFromDB(function(error, quotes){
		res.json(quotes);
	});
});

app.use(function(req, res, next) {
res.writeHead(404, {"Content-Type": "text/plain"});
res.write('404 Page Not Found');
    res.end();
});

module.exports=app;