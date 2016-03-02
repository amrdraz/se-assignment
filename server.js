var app = require('./app.js').app;
var db = require('./db.js');
var quotes = require('./quotes.js');



db.connect(function (argument) {
    quotes.seed(function (argument) {
        app.listen(8080);
    });
});
