var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});