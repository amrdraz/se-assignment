require('./app')(function(app) {
  app.listen(7000, function() {
    console.log("[OK]");
  });
});
