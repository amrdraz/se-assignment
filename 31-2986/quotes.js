var mongo = require('mongodb');
var quotes= require('../quotes.json');
var db=require('./db.js').db();




db.open(function(err, db) {

    if(!err) {

        seed(function(err, seeded){
            
            if(seeded)

                console.log("The 'quotes' collection doesn't exist. Creating it with 'quotes.json' file...");

            else
                console.log("Connected to 'inspire-me' database");
            
        });
    }
});



var getElementByIndexElseRandom= function(array,index){
    
    if(index === undefined){
    
        return array[Math.floor(Math.floor(Math.random()*array.length))];
    }

    else

        return array[index];

};



exports.getQuotesFromJSON=function(req,res){

    return quotes;

};



exports.getQuoteFromJSON= function(index){

    return this.getElementByIndexElseRandom( quotes , index);

};



var getQuotesFromDB = function(cb) {
    
    db.collection('quotes', function(err, collection) {

        collection.find().toArray(function(err, outcomes) {

            cb(err,outcomes);
       
        });
    });
};




exports.getQuotes = function(req,res){

    getQuotesFromDB(function (err,quotes){

        res.send(quotes);

    });
};



var getQuoteFromDB = function(cb, index) {

    console.log('Retrieving quote' );

    db.collection('quotes', function(err, collection) {

        collection.find().toArray(function(err, outcomes) {

        	if (index === undefined)

               cb(err, outcomes[Math.floor(Math.floor(Math.random()*outcomes.length))] );

       		else
                cb(err, outcomes[index]);
        
        });
    });
};




exports.getAQuote = function(req,res){

	getQuoteFromDB(function (err,quote){

		res.send(quote);

	});
};



var seed = function(cb){

    db.collection('quotes',  {strict:true}, function(err, collection) {

        if(err){

            db.collection('quotes', function(err, collection) {


                collection.insert(quotes, {safe:true}, function(err, result) {});
                
                cb(err,true);

            });
        }
       
        if (!err) {

            collection.count(function (err, count) {

                if (!err && count === 0) {

                  collection.insert(quotes, {safe:true}, function(err, result) {});
                  
                  cb(err,true);

                }
                
                else {
                  
                    cb(err,false);
                    
                }

            });

        }

    });
};



exports.getQuoteFromDB = getQuoteFromDB;
exports.getQuotesFromDB = getQuotesFromDB;
exports.seed = seed;
exports.quotes=quotes;
exports.getElementByIndexElseRandom =getElementByIndexElseRandom;