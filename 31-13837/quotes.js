var db = require('./db.js');
var fs = require('fs');

var collection;
var myData = [];


function getElementByIndexElseRandom(array, index){
  // if not given an index assign random
  if(index === undefined){
    index = Math.floor(Math.random() * array.length);
  } else {
    // else bound index to the array length;
    index = (index < array.length)?index:array.length;
  }
  return array[index];
};


function getQuotesFromJSON(){
   myData = require('../quotes.json');
   return myData;
};

function getQuoteFromJSON(index){
  return getElementByIndexElseRandom(getQuotesFromJSON(), index);
};


var getQuotesFromDB = function getQuotesFromDB(cb){
  db.db().collection('quotes', function(err, coll){
    coll.find().toArray(function(err, data){
      cb(err, data);
    });
  });
};

var getQuoteFromDB = function getQuoteFromDB(cb,index){
  getQuotesFromDB(function(err, quotes){
    cb(err, getElementByIndexElseRandom(quotes, index));
  });
};

var seed = function seed(cb){
  getQuotesFromJSON();
  db.db().collection('quotes', function(err, coll){
    coll.find().toArray(function(err, data){
      if(data.length != 0){
        cb(err, false);
      } else {
        coll.insert(myData, function(err, result){
          if(!err) cb(err, true);
          else cb(err, false);
        });
      }
    });
  });
};


exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
exports.getQuotesFromJSON=getQuotesFromJSON;
exports.getQuoteFromJSON=getQuoteFromJSON;
exports.seed=seed;
exports.getQuoteFromDB=getQuoteFromDB;
exports.getQuotesFromDB=getQuotesFromDB;
