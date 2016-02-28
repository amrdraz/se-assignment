var fs =require('fs');
var DB;
var DB1 = require('./db');
DB1.connect(function(db){
DB = db;

});

var getElementByIndexElseRandom = function getElementByIndexElseRandom(array , index){

    if(index === undefined){
        console.log('!index');
    return array[Math.floor(Math.random() * array.length)];

}else{
    return array[index];
}
}



var getQuotesFromJSON = function getQuotesFromJSON(){

var array = require('../quotes.json');
return array;
};

   var getQuoteFromJSON =  function getQuoteFromJSON(index){
        var array = getQuotesFromJSON();
        return getElementByIndexElseRandom(array,index);


    };

    


    var seed = function seed(cb){

      var array = getQuotesFromJSON();  
      DB.collection('quotes').insert(array,function(error,seed){
        if (error) {
            cb(error,false);
        }else
        cb(null,true);

      });
    
    };


    var getQuotesFromDB = function getQuotesFromDB(cb) {
    // any of quote object in the database  
    var array = DB.collection('quotes').find().toArray(function(error,docs){
    if(error)
        cb(error,null);
    else
        cb(null,docs);

    });

    };
    var getQuoteFromDB = function getQuoteFromDB(cb,index){

    if(index == null){
    var array = getQuotesFromDB(function(error,quotes){
        if (!error) {
    var quote = getElementByIndexElseRandom(quotes);
    cb(null,quote);
    }
    else
    cb(error,null);

    });

    } 
    else {

    var array = getQuotesFromDB(function(error,quotes){
        if (!error) {
    var quote = getElementByIndexElseRandom(quotes,index);
    cb(null,quote);
}else
    cb(error,null);

    });

    } 

    };


    exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
    exports.getQuotesFromDB = getQuotesFromDB;
    exports.getQuoteFromDB = getQuoteFromDB;
    exports.getQuotesFromJSON = getQuotesFromJSON;
    exports.getQuoteFromJSON = getQuoteFromJSON;
    exports.seed=seed;



