var express = require('express'),
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.listen(3000);
console.log('Listening on port 00000000000000...');
});