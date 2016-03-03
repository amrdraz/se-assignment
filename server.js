var app = require('./app.js');
var db = require('./static/js/db.js');
var functions = require('./static/js/quotes.js');

db.connect(function(err) {
    console.log('connected to db');
    functions.seed(function () {
        console.log('seeded db');
        app.listen(3000, function(){
           console.log('Listening on 3000');
        });
    });
});