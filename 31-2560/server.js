var http = require('http');
var db = require('./db.js');
var q = require('./quotes.js');
var express = require('express');
var app = require('./app.js');

db.connect(function(cb){
    q.seed(function(err, seeded){
    	//console.log(seeded);
        //app.listen(3000);
    });
    
});

