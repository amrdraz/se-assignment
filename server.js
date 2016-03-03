var app = require('./app');
var db =  require('./db');
var quotes = require('./quotes');

db.connect(function(err) {
    console.log('connected to db');
    quotes.seed(function () {
        console.log('seeded db');
        app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
            quotes.getQuoteFromDB(function(err,quote){

              console.log(quote);
            })
                            });
    });
});
