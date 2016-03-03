var app = require('./app.js');
var db = require('./db.js');
var quotes = require('./quotes.js');
var ddddb= require('./db.js');
db.connect(function(err, db1) {
    console.log('connected to db');
    quotes.seed(function (err,seeded) {
        console.log('seeded db'+seeded);
        app.listen(3000,function() {
          
            console.log('Example app listening on port 3000!');
        });
    });
});
