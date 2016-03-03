var db= require("./db.js");
var quotes = require('../quotes.json');

var getElementByIndexElseRandom = function(array, index){
    if (index == undefined)
    {
        var x = Math.floor(Math.random()*(array.length));
        return array[x];
    }

    else
     return array[index];
}

var getQuotesFromJSON = function(){
    return quotes;
}

var getQuoteFromJSON = function (index){
    return getElementByIndexElseRandom(quotes, index);
}

var seed = function (cb){
    db.db().collection("quotes").count(function(err, count){
        if(count==0){
            db.db().collection("quotes").insertMany(quotes);
            cb(err, true);
            console.log("DB was empty and it's now filled...supposedly!");
        }
        else{
            cb(err, false);
            console.log("DB is not empty");

        }
    });
}

var getQuotesFromDB = function(cb){
    db.db().collection('quotes').find().toArray(function(err,collections){
        if(err)
            console.log(err);
        cb(err, collections);
    });
}

var getQuoteFromDB = function(cb, index){
    db.db().collection('quotes').find().toArray(function(err,collections){
        if(err)
            console.log(err);
        else
            var quote = getElementByIndexElseRandom(collections,index);
        cb(err, quote);
    });
}

module.exports = {
    getElementByIndexElseRandom: getElementByIndexElseRandom,
    getQuoteFromJSON: getQuoteFromJSON,
    getQuotesFromJSON: getQuotesFromJSON,
    getQuoteFromDB: getQuoteFromDB,
    getQuotesFromDB: getQuotesFromDB,
    seed: seed
}