
var fs = require('fs');
var app = require('./app.js');
var db = require('./db.js');

db.connect(function (err, db) {
    if (db != undefined) {
    //   app.listen(process.env.PORT || 3000, function(){
    //     console.log('HTTP Server running on port 3000!'); 
    //   });
    }
});
 