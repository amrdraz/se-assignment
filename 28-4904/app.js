var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile('index.html', {root: __dirname })
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});