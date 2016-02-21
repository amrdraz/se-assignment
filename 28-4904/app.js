var express = require('express');
var app = express();

// Adding Quotes.json file to global variable appdata
app.locals.appdata = require('./quotes.json');

// Adding static public files
app.use(express.static('public'));

// Route to Server.js
var server = require('./server.js');
app.use('/',server);
// Route to Quotes.json
app.get('/api/quotes',function(req, res) {
	res.sendfile('./quotes.json');
});
// Route to Quote
app.get('/api/quote',function(req, res) {
	
});

// Error Handling
app.use(function(req, res, next) {
  //res.status(404).send('404 NOT FOUND');
  res.sendfile('./public/error.html', {root: __dirname })
});

app.listen(8080, function () {
  console.log('Motivate Me app listening on port 8080!');
});