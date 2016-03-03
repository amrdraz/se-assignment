//var http = require('http');
var app=require('./app.js');
var db = require('./db.js');
var file= require('./quotes.js');


db.connect(function(err,db) {
    console.log('connected to db');
    file.seed(function() 
    {
    	console.log('seeded db');
        app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
        });
    });
});