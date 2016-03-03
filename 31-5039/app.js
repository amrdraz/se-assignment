/*var express = require('express');
var app = express();

app.use(express.static('./public'));
app.get('/api/post', function(req, res) {
    var post = {
        "header": "Title added with Ajax from a /api/post route",
        "body": "This post's body text was populated with JavaScript"
    }
    res.send(post)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

*/
var express = require('express'),
  dbQuotes = require('./quotes.js');
 var TestDatabase = require('./db.js')
var app = express();
module.exports = app;
TestDatabase.connect(function (db){
  dbQuotes.seed(function (err,seeded){
    console.log(seeded);
  })
});
app.use(express.static('./public'));
app.configure(function () {
    app.use(express.logger('dev'));     // 'default', 'short', 'tiny', 'dev' 
    app.use(express.bodyParser());
});


//app.get('/api/quote', dbQuotes.getQuoteFromDB);
//app.get('/api/quotes', dbQuotes.getQuotesFromDB);
app.get('/api/quote', function(req, res, next) {
  dbQuotes.getQuoteFromDB(function(err, retQuote){
    if (err)
    console.log("ERRRRRRRRRRR");
    else
    res.send(retQuote);
})
});

app.get('/api/quotes', function(req, res, next) {
  dbQuotes.getQuotesFromDB(function(err, retQuote){
    if (err)
    console.log("ERRRRRRRRRRR");
    else{
    res.send(retQuote);
  }
})
});
var port = 3000;
app.listen(port);
console.log('Listening on port ' + port +' how about that ? :D ');

