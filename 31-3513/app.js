var express = require('express');
var app = express();
var db = require('./Public/db.js');
var quote = require('./Public/quotes.js');

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/Public/index.html');
// });

// app.get('/css/style.css', function(req, res) {
//    res.sendFile(__dirname + '/Public/css/style.css'); 
// });

app.use(express.static('./Public'));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

  app.get('/api/quote', function (req, res, next){
	quote.getQuoteFromDB(function fn(err, quotes) {
		res.send(quotes);	
	});
});
app.get('/api/quotes', function(req, res, next) {
	  quote.getQuotesFromDB(function function_name(quotes){
          res.send(quotes);
	});
});










// db.connect(function(err) {
//     console.log('connected to db');
//     db.seed(function () {
//         console.log('seeded db');
//         app.listen(8080, function() {
//             console.log('Example app listening on port 8080!');
//         });
//     });
// });


module.exports = app;