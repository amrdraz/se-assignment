
var express = require('express');

var app = express();

app.use(express.static('./public'));

var db = require('./db')
//var db = require('./db')
// connect to database..then use callbacks!
db.connect(function(){
    app.listen(3002, function() {
            console.log('Example app listening on port 3001!');
               var quotes = require('./quotes');
  quotes.seed(function(s,e)
  {
      console.log(e);
  
        });
        
    });
});
   // time to seed database
  
  app.get('/api/quotes', function(req, res) {
    var quotes = require('./quotes');
     quotes.getQuoteFromDB(function(err,quote)
     {
         console.log(quote);
         res.status(200);
           res.send(quote);
     });
  
});
