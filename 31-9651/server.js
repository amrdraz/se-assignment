var express = require('express');
var app = express();

app.set('port', process.env.PORT || '3000');
app.listen(process.env.PORT || 3000);
console.log('Express server started on port 3000 and working', process.env.PORT || 3000);