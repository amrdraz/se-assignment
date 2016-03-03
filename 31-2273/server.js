var app=require('./app');
var db=require('./db');
var quotes=require('./public/quotes');


db.connect(function(err,result) {
    console.log('connected to db');
        quotes.seed(function (err) {
            console.log('seeded db');
                app.listen(8080, function() {
                    console.log('Example app listening on port 8080!');


        });
    });
});

