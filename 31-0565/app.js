var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db =require('./db');
var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('public'));


app.use(require('./routes/index'));




module.exports = app;
