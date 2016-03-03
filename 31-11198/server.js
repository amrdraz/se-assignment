
var app = require('./app.js');
var db = require('./db.js');
var app = require('./app.js');
var quote =require('./quotes.js');



db.connect(function(err) {
    console.log('connected to db');
    quote.seed(function(err, seeded){
        console.log('seeded db');
        app.listen(3000, function() {
            console.log("Server listening on: http://localhost:3000");
    });
        });
});