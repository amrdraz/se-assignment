var http = require('http');
var fs = require('fs');
var express = require('express');
var app = require('./app.js');
var db = require("./db.js");
var qu = require("./quotes.js")
db.connect(function(err,db){
	qu.seed(function(){
		app.listen(4000);
	});
})