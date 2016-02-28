var arr = require('../quotes.json');
var DB = require('./db.js');


exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(array, index) {
    index = index === undefined ? Math.floor(Math.random() * array.length) : index;
    return array[index];
};

exports.getQuotesFromJSON =function getQuotesFromJSON(){
  return arr;
};

exports.getQuoteFromJSON =function getQuoteFromJSON(index){
  index = index === undefined ? Math.floor(Math.random() * arr.length) : index;
  return arr[index];
};

exports.seed = function seed(cb) { //bs di el fadla hena
  DB.db().collection('quotes').count(function (err, count) {
      if (!err && count === 0) {
        DB.db().collection('quotes').insert(arr, function (err, inserted) {
          cb(err,true);
        });
      }else {
        cb(err, false);
      }
  });
};

exports.getQuotesFromDB = function getQuotesFromDB(cb){
    DB.db().collection('quotes').find({}).toArray(function(err, quotes){
      cb(err, quotes);
    });
};

exports.getQuoteFromDB = function getQuoteFromDB(cb,index){
  DB.db().collection('quotes').find({}).toArray(function(err, quotes){
    index = index === undefined ? Math.floor(Math.random() * quotes.length) : index;
    var quote = quotes[index];
    cb(err, quote);
  });
};
