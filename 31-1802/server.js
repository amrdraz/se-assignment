var app = require('./app.js');
var db = require('./db.js');
var quotes = require('./public/quotes.js')

db.connect(function(err) {
    console.log('connected to db');
    quotes.seed(function (err) {
    	if(err) throw err;
    	console.log("checkpoint 1");
        console.log('seeded db');
        app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
        });
    });
});