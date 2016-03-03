module.exports.getQuotesFromJSON = getQuotesFromJSON;
module.exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
module.exports.getQuoteFromJSON = getQuoteFromJSON;

function getElementByIndexElseRandom(array, index){
  if(typeof index == "undefined"){
    return array[Math.floor(Math.random() * array.length)];
  }else{
    return array[index];
  }
}

function getQuotesFromJSON(){
  var fs = require('fs');
  var quotes = fs.readFileSync('../quotes.json', 'utf8');
  return JSON.parse(quotes);
}

function getQuoteFromJSON(index){
  var array = getQuotesFromJSON();
  var qoute = getElementByIndexElseRandom(array,index);
  return JSON.stringify(qoute);
}

exports.seed =function(cb){
  var db = require('./db.js');
  var fs = require('fs');
  db.connect(function(err,db){
    var mydocuments = fs.readFile('../quotes.json', 'utf8', function (err, data) {
      var collection = db.collection('quotes');
      collection.count({},function(err,numOfDocs){
        if (err) throw err;
        if(numOfDocs===0){
          collection.insert(JSON.parse(data), function(err, docs) {
            if(err) throw err;
            //db.close();
            cb(null,true); });
          }
          else{
            cb(null,false);
          }
        });

      });
    });
  }

  exports.getQuotesFromDB=function(cb){
    var db = require('./db.js');
    var fs = require('fs');
    db.connect(function(err,db){
        var collection = db.collection('quotes');
        collection.find().toArray(function(err, docs) {
          if(err)throw err;
          cb(null,docs)
        });
    })}

    exports.getQuoteFromDB=function(cb ,i){
      var db = require('./db.js');
      var fs = require('fs');
      db.connect(function(err,db){
        var collection = db.collection('quotes');

        collection.find().toArray(function(err, docs) {
          if(err)throw err;
          if(typeof i === 'undefined'){
            cb(null, docs[Math.floor(Math.random()* docs.length)]);
          }
          else{
            cb(null,docs[i]);
          }

        });
      })
    }




    //getQuoteFromJSON(2);
    /*
    getQuoteFromDB(function(err,quote){
    if (err) {
    return console.log('dcs');
  }
  console.log(quote);
})

getQuotesFromDB(function(err,quotes){
if (err) {
return console.log(err.message);
}
console.log('quotes');
})

seed(function(err,seeded){
if (err) {
return console.log(err.message);
}
console.log('number of documents');
})
*/
