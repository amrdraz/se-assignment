var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/public/css/style.css', function(req, res) {
   res.sendFile(__dirname + '/public/css/style.css'); 
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});