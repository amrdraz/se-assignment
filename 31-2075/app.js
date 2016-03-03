var express = require('express');
var app = express();
var quotesJS = require('./quotes.js');
var router = express.Router();
var db = require('./db.js');

db.connect(function(){
	db.clearDB(function(done){
		if(done){
			quotesJS.seed(function(err, seeded){
				if (seeded === true){
					console.log('Seeded successfully.');
					// console.log(quotesJS.getQuotesFromDB());
				}
				else{
					console.log(err);
				}
			})
		}
	})
});

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
// app.use(express.static('./public'));

app.get('/api/quote', function(req, res){
	quotesJS.getQuoteFromDB(function(err,quote){
  	res.send(quote);
  });
});

app.get('/api/quotes', function(req, res){
   	quotesJS.getQuotesFromDB(function(err,items){
  	res.json(items);
  });
});

app.get('*', function(req, res) {
	res.status(404);
    res.sendFile(__dirname + '/public/404.html');
});

  app.use(function(req, res) {
     res.send('404: Page not Found', 404);
  });


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});


module.exports = app;