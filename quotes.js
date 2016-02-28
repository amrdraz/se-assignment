var express  = require('express');
var http     = require('http');
var app      = express();
var fs       = require('fs');
var db       = require('./db.js');




var obj = JSON.parse(fs.readFileSync('./quotes.json', 'utf8'));


var getElementByIndexElseRandom = exports.getElementByIndexElseRandom = function (array, index) {
        index = index === undefined ? Math.floor(Math.random() * array.length) : index;
        return array[index];
    }


var getQuotesFromJSON = exports.getQuotesFromJSON = function(){
	var obj = JSON.parse(fs.readFileSync('./quotes.json', 'utf8'));
  return obj;
}

exports.getQuoteFromJSON = function(index){
    index = index === undefined ? Math.floor(Math.random() * getQuotesFromJSON().length) : index;
    var obj = JSON.parse(fs.readFileSync('./quotes.json', 'utf8'));
    return obj[index];
}


exports.seed = function(cb){

  db.connect(function (err,database){
    if(err) throw err;

  var collection = database.collection('quotes');
  collection.count(function(err,count){
    if(err) throw err;
    if (count === 0){
      for(var i in obj) {
            var quote = obj[i];
            collection.insert(quote,function (err, result) {
              if (err) {
                throw err;
              }
              
        });
    }
      cb (null, true);
    }
    else cb(null,false);
  });
        
});
}

var getQuotesFromDB = exports.getQuotesFromDB = function(cb){
  db.db().collection('quotes').find().toArray(function (err,data){
    if (err) throw err;
    cb(err,data);
  });
}

exports.getQuoteFromDB = function(cb,index){
  getQuotesFromDB(function (err,data){
    cb(err,getElementByIndexElseRandom (data,index));
  });
}

exports.contains = function (array,element){
  for (var i=0; i<array.length; i++){
    if(equals(array[i],element)){
      return true;
    }
  }
  return false;
}
var equals = exports.equals = function(quote1, quote2){
  if(quote1.text===quote2.text && quote1.author===quote2.author){

    return true;
  }
  return false;
}