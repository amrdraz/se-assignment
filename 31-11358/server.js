var app = require('./app.js');
var db = require('./db.js');
var Quote = require('./quotes.js');

db.connect(function(err) {
    console.log('connected to db');
    Quote.seed(function () {
        console.log('seeded db');
        app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
        });
    });
});
