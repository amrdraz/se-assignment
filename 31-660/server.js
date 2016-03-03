var app = require('./app.js');
var db = require('./static/js/db.js');
var quote = require('./static/js/quotes.js');

db.connect(function(err) {
    quote.seed(function () {
        app.listen(3000, function() {
        });
    });
});