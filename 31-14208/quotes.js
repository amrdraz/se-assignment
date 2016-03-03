var fs= require("../quotes.json");
//var assert = require('assert');
//var ObjectId = require('mongodb').ObjectID;
var db= require('./db.js');

function getElementByIndexElseRandom(array , index){
    console.log("getElementByIndexElseRandom");
    if (index != undefined){
        return array[index];
    }else {
        return array[Math.floor(Math.random()*array.length)];
    }
}


exports.getQuotesFromJSON = function(){
    return fs;
}

exports.getQuoteFromJSON = function(index){
    console.log("getQuoteFromJSON");
    return getElementByIndexElseRandom(fs,index);
};

exports.seed = function (cb) {
    console.log("INSIDE SEED FUNCTION");
    db.db().collection('quotes').count(function(err, count){
        if(count!=0) {
            console.log("COUNT IS NOT ZERO");
            cb(err,false)
        }
        else {
            console.log("COUNT IS ZERO");
            console.log("INSERTING MANY");
            db.db().collection('quotes').insertMany(fs, function(err){
                if (err) {
                    cb(err, false);
                } else {
                    cb(err, true);
                }

            });
        }
    });
};

function getQuotesFromDB (cb) {
    console.log("getQuotesFromDB");
    db.db().collection('quotes').find().toArray(cb);
    // db.db().collection('quotes').find().toArray(function(err, quotes) {
    //     console.log("getQuotesFromDB bardooooo");
    //   quotes=  getQuotesFromJSON();
    //   cb(err,quotes);
    // });
}

exports.getQuoteFromDB=function getQuoteFromDB(cb , index){
//   getElementByIndexElseRandom(db.db().collection('quotes').find(),index);
    console.log('gwa method l get quote form db nw');
    db.db().collection('quotes').find().toArray(function(err,quotes){
        console.log('gwa method l to array fl get quote form db nw');
        // console.log(quotes);
        var quote =  getElementByIndexElseRandom(quotes, index);
        console.log('tb dlwa2ty gbt l quote');
        console.log(quote);
        cb(err,quote);
    });
}
// ==============================================



//   db.connect(function(err,db){
//       if (err) console.log("ERR => ", err);
//       else {
//           seed(function(err, isDataSeeded){
//               console.log("isDataSeeded => ", isDataSeeded);
//           });
//       }
//   });

    //   db.connect(function (err, db) {
    //      console.log("CALLING SEED FUNCTION");
    //   seed(function (err,seeded) {
    //       console.log('ay 7aga');
    //       console.log(err);
    //     console.log(seeded);
    //  })
    //  });



     console.log("trying the db connect");


    //  db.connect(function (err,db){

    //      console.log("indide the db connect");

    //       getQuotesFromDB(function (err,quotes) {
    //       console.log("reavhed getQuotesFromDB");
    //       console.log(err);
    //       console.log(quotes);
    //   });

    //  });
//   db.connect(function (err, db) {
//       console.log("inside the db connect");
//       getQuoteFromDB(function (err,quotes) {
//           console.log("reached getQuotesFromDB");
//           console.log(err);
//           console.log(quotes);

//       });
//     });

//      db.connect(function (err,db){
//          getQuoteFromDB(function(err,quote){
//              console.log('hello');
//              console.log(err);
//              console.log(quote);
//              console.log('hello');
//          })
//       });
