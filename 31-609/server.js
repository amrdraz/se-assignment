var app = require('./app');

var database = require('./db').connect(function(err, db) {
  var quotes = require('./quotes').seed(function(err, seeded) {
    if(err)
    throw err;

    console.log(seeded? 'Seeded successfuly' : 'failed to seed');

    app.listen(7000, function() {
      console.log("[OK]");
    });
  });
});
