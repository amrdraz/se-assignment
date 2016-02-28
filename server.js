
var app = require('./app.js');
var quotes = require('./quotes.js');
var db = require('./db.js');

quotes.seed(function(err, seeded) {
  if (seeded) console.log('seeded');
  else console.log('not seeded');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
