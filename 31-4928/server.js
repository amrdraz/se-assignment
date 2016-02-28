var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path    = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '/scripts')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api',require('./app.js'));
app.use('/',require('./app.js'));
app.use('/style.css',require('./app.js'));


app.use(function(req, res, next) {
  var err = new Error('404 Page not found');
  res.status(404).send('404 Page not found');

});




app.listen(3000);
console.log("Server Up On Port 3000");