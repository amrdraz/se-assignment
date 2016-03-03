
var express = require('express');
var app = express();

app.use(express.static('static'));

app.use(require('./routes/router'));

module.exports = app;