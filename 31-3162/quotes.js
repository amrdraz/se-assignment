 var DB = require('./db.js');
 var quotes = require('./quotes.js');
 var file = require('./quotes.json');

function getElementByIndexElseRandom(array, index) {
    index = index === undefined ? Math.floor(Math.random() * array.length) : index;
    return array[index];
}


function getQuotesFromJSON() {
    return file;
}

function getQuoteFromJSON(index) {
    var array = getQuotesFromJSON();
    if(index == null){
    return getElementByIndexElseRandom(array, index);
    }
    else
        return array[index];
}

exports.getQuoteFromJSON = getQuoteFromJSON;


function seed(cb) {
    var array = getQuotesFromJSON();
    DB.db().collection('quotes').find({}).toArray(function(err, quote) {
        if (err) 
          console.log(err);
        if(quote.length == 0){
          for(i =0; i<array.length; i++){
                  DB.db().collection('quotes').insert(array[i], function(err, result) {
                  assert.equal(null, err);
                      assert.equal(1, result.result.n);
                      if(err)
                          cb(err, false);
                  });
          }
          cb(err, true);
        }else{
          cb(err, false);
        }
    });
}

exports.seed = seed;


function getQuotesFromDB (cb){
    var data = DB.db().get('quotes');
    data.find({}, function (err, docs){
       cb(err,docs);
    });
} 

exports.getQuotesFromDB = getQuotesFromDB;

function getQuoteFromDB(cb, index){
    if(arguments.length ===1){
        quotes.getQuotesFromDB(function(err,end){
            var ranJson = quotes.getElementByIndexElseRandom(end);
            cb(err, ranJson);
    });
    }
    if(arguments.length===2){
        quotes.getQuoteFromDB(function(err,end){
            quotes.getElementByIndexElseRandom(end, index);
            cb(err, ranJson);
        });
    }
}

exports.getQuoteFromDB = getQuoteFromDB;

// var Qarray  = getQuotesFromJSON(); 
//     DB.db().collection('quotes').find({}).toArray(function(err,quote){
//         console.log(quote);
//         if(err)
//             console.log(err);
//         if(quote.length == 0){
//             DB.db().collection('quotes').insertMany(getQuotesFromJSON(), function(err, result){
//                 assert.equal(null, err);
//                 assert.equal(1, result.result.n);
//                 cb(err);
//             });
//         }
//         else{
//             cb(null, false);
//         }
       
//     });

// function getQuoteFromDB(cb, index){
//     var ranJson;
//     if(index == null){
//         console.log('Null indexxx')
//         ranJson = getQuoteFromJSON(null);
//     }
//     else{
//         console.log('log');
//         ranJson = getQuoteFromJSON(index);
//     }
//     DB.db().collection('quotes').find({"text":ranJson.text.toString()}).toArray(function(err, quotes){
//         if(err)
//             return cb(err);
//         else
//             return cb(null, quotes);
//     });   
// }

// var Qarray  = getQuotesFromJSON(); 
//     DB.db().collection('quotes').fcount(function(err,count){
//         if(count == 0){
//             DB.db().collection('quotes').insert(quotes.getQuotesFromJSON(), function(err, docs){
//                 cb(err,true);
//                 console.log(' inserted!!! ');
//                 cb(err,true);
//             });
//         }
//         else{
//             console.log(' database is finally ready!! ');
//             cb(err, false);
//         }
//     });