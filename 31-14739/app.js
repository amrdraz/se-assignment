var express = require('express');
var quotes = require('./quotes.js');
var app = express();
var db = require('./db');
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


db.connect(function(db){
    quotes.seed(function(er,seeded){

    })
})


app.get('/api/quote', function(req, res) {
    var quote = quotes.getQuoteFromDB(function(err, qu) {
        res.json(qu);
    });
});


app.get('/api/quotes', function(req, res) {
    //res.json(quotes.getQuotesFromDB());
    var quote = quotes.getQuotesFromDB(function(err, qu) {
        res.json(qu);
    });
});
/*
app.use(express.static('public'));

app.listen(8000,function(){
    console.log("listening on port 8000...");
});



module.exports = app;
*/