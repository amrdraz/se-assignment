var fs = require('fs');
var DB = require('./db');
var karim = require('./quotes');

exports.getElementByIndexElseRandom = function(array, index){
if(arguments.length===1)
return array[Math.floor(Math.random()*array.length)];
else{
  if(arguments.length===2)
  return array[index];
}
};

exports.getQuotesFromJSON = function(){
  var json = JSON.parse(fs.readFileSync('quotes.json','utf8'));
  return json;
};

exports.getQuoteFromJSON = function(index){
  var quotes = require('./quotes');
    var json = JSON.parse(fs.readFileSync('quotes.json','utf8'));
if(arguments.length===1)
    return  karim.getElementByIndexElseRandom(json, index);
else{
  if(arguments.length===0)
    return karim.getElementByIndexElseRandom(json);
}


};
exports.seed = function(cb){
  var quotes = require('./quotes');
  var collection1 = DB.db();
  var counter;
  var collection = collection1.collection('quotes');
  collection.find().count(function(err, count){
    if(count===0){
      collection.insert(karim.getQuotesFromJSON(),function(err,docs){
        cb(err,true);
      });
    }
    else{
      cb(err,false);
    }
  });
}

exports.getQuotesFromDB = function(cb){
  var collection1 = DB.db();
  var collection = collection1.collection('quotes');
  collection.find().toArray(function(err,quotes){
    if(err) throw cb(err, quotes);
    cb(null,quotes);
  });
}

exports.getQuoteFromDB = function(cb,index){
  var quotes = require('./quotes');
  //var collection1 = DB.db();
  if (arguments.length===1){
  karim.getQuotesFromDB(function(err, quotes){
  if(err) cb(err, quotes);
  else
  cb(null, karim.getElementByIndexElseRandom(quotes));

});
} else{
  karim.getQuotesFromDB(function(err,quotes){
    if(err) cb(err,quotes);
    else
      cb(null, karim.getElementByIndexElseRandom(quotes, index));

  });
}

};
