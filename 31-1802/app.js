var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('./public'));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});