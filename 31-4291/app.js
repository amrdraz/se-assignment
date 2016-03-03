var express = require('express');
var quotes=require('./quotes.js');

var port = 3000;

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, function () {
		  console.log('listening on port:' +port);
});



app.get('/api/quote' ,function (req,res){
	quotes.getQuoteFromDB(function(err,data){
		// console.log("[/api/quote] => quote", data);		
		res.send(data);
	});
});


app.get('/api/quotes' ,function (req,res){
	quotes.getQuotesFromDB(function(err,quote){
		res.send(quote);
	});
});

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/error_page.html');
});



// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

module.exports = app;


