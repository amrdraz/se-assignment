var  express =require('express');
var app =express();
var path = require('path');
var quo =require('./quotes');
quo.seed(function(err,seeded){
  if (err){
      console.log('database error');
  }
});
var route =require('./app');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', route);
app.use(function(req, res, next){
    res.status(404);


    // default to plain-text. send()
    res.sendfile('404.html', {root: 'public' });
});
app.set('port', process.env.PORT || '3000');
app.listen(app.get('port'),function(){
    console.log('Express work');
});