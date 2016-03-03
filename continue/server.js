
var db = require('./db.js');
var app = require('./app.js');
var quotes= require('./quotes.js');
db.connect(function (db) {
    console.log('connected to db');
   quotes.seed(function (seed) {
        console.log('seeded db');
         app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
        });
   });
 });