module.exports = function(app){

  var home = function(request, response){
    response.render('index.hjs', {
      quote: 'Click me to spread happiness',
    });
  };

  app.get('/', home);
  app.get('/index', home);
  app.get('/index.html', home);

  app.use(function(request, response, next) {
    response.render('404NotFound.hjs')
  });
};
