var fs = require('fs');
var db = require('./db');
var mongo = require('mongodb').MongoClient ;
var q = require('./quotes');

exports.getElementByIndexElseRandom = function(array,index){
  if(arguments.length===1)
    return array[Math.floor(Math.random()*array.length)];
  else {
    if(arguments.length===2)
      return array[index];
  }
};

exports.getQuotesFromJSON = function(){
var json = JSON.parse(fs.readFileSync('../quotes.json','utf8'));
return json;
};


exports.getQuoteFromJSON = function(index){
var json = JSON.parse(fs.readFileSync('../quotes.json','utf8'));
  if(arguments.length===0){


return  q.getElementByIndexElseRandom(json);
}else{

  return q.getElementByIndexElseRandom(json,index)
}};


exports.seed = function(cb){
  var databaseInstance = db.db();
  var counter;
  var collection = databaseInstance.collection("quotes");
  collection.find().count(function(err,count){
      if(count===0){
        collection.insert(q.getQuotesFromJSON(),function(err,docs){
          cb(err,true);
        });
      }else{
        cb(err,false);
      }
  });
}


exports.getQuotesFromDB = function (cb) {
  var databaseInstance = db.db();
  var collection = databaseInstance.collection("quotes");
  collection.find().toArray(function(err,quotes){
    if(err)  cb(err,quotes);
    else
      cb(null,quotes);
  });

};


exports.getQuoteFromDB = function(cb,index){
if(arguments.length===1){
q.getQuotesFromDB(function(err,quotes){
  if (err) cb(err,quotes);
  else
  cb(null,q.getElementByIndexElseRandom(quotes));

});
}else {
  q.getQuotesFromDB(function(err,quotes){
    if(err) cb(err,quotes);
    else
      cb(null,q.getElementByIndexElseRandom(quotes,index))

  });
}

};
