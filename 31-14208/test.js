var quotesss= require('./quotes.js');

var db= require('./db.js');
 db.connect(function (err, db) {
      console.log("inside the db connect");
      quotesss. getQuoteFromDB(function (err,quotes) {
          console.log("reached getQuotesFromDB");
          console.log(err);
          console.log(quotes.text);
          console.log(quotes.author);
         
      });
    });
    