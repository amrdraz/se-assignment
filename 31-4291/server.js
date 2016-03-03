var http = require('http');
var fs = require('fs'); //not sure
var app=require('./app.js').app;
var database=require('./db.js');
var quotes=require('./quotes.js');


var port = 3000;


database.connect(function (cb){
	quotes.seed(function(cb){
	});
});




