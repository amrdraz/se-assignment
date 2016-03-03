var express = require('express');
var app = express();
var routes = require('./routes/routes.js');

app.use(express.static('./public/'));

app.use(express.static('../quotes.JSON'));

//app.use(require('./routes/routes.js'));

app.use('/', routes);
app.use('/api', routes);


module.exports = app;