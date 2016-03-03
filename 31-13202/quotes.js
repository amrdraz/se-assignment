var fs  = require('fs');
var json = require('/home/ahmed/ripo0/quotes.json'); //(with path)
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/dbquote';
var DB = null;
var db = require('./db');
var quotes = require('./quotes');





 module.exports = {

   getElementByIndexElseRandom : function(array,index){
	if(index != undefined){
	return array[index];
    }
    else{
    var x = Math.floor(Math.random() * (array.length ))  ;
	return array[x];
    }
  },

  getQuotesFromJSON: function() {
  // fs.createReadStream('./quotes.jason').pipe();
  //$.getJSON("test.json", function(json) {
    //console.log(json); // this will show the info it in firebug console});
    return json;

 },

 getQuoteFromJSON: function(index) {
   var quotelist = quotes(json);
   return getElementByIndexElseRandom(quotelist,index); 
},
quotes : function (json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
},

seed:function(cb)
{
  DB=db.db();
  DB.collection('quotec').find().count(function(er,count1)
  { if(count1==0&&!er)
    {
      DB.collection('quotec').insertMany(json,function(error,inserted)
        {if(!error)
          {
            cb(error,true);

          }
          else
          {
            cb(error,false);
            
          }
        });
    }
    else
    {
      cb(er,false);
    }
  });
},
 getQuotesFromDB : function (cb)
{
  DB=db.db();
  DB.collection('quotec').find().toArray(function (err,quotes)
  {if(!err)
   {
    cb(err,quotes);
    }
    else
     {
      cb(err,null);
     }
    });
  },
getQuoteFromDB : function(cb,index)
{  getQuotesFromDB(function(err,quotes)
  {if(!err){
      var quote=getElementByIndexElseRandom(quotes,index);
      cb(err,quote);
    }
    else
    {
      cb(err,null);
    }
  });
},
}
var getQuotesFromDB=function (cb)
{
  DB=db.db();
  DB.collection('quotec').find().toArray(function (err,quotes)
  {if(!err)
   {
    cb(err,quotes);
    }
    else
     {
      cb(err,null);
     }
    });
  }
var getElementByIndexElseRandom = function(array,index){
  if(index != undefined){
  return array[index];
    }
    else{
    var x = Math.floor(Math.random() * (array.length ))  ;
  return array[x];
    }
  }

  var quotes =function (json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}
  // seed : function (cb){
  //    var DB;
  //    var list = quotes(json);
  //  MongoClient.connect(url,function(err,db){
  //   DB=db;
  //   DB.collection('qcollection').insertMany(list,function(err,inserted){}

  //     )}

       
  //    });
  //  }
  // },

 // function quotes (json){
 //    var result = [];
 //    var keys = Object.keys(json);
 //    keys.forEach(function(key){
 //        result.push(json[key]);
 //    });
 //    return result;
 //  }



// function seed (cb){
// var DB;
//    MongoClient.connect(url,function(err,db){

//     DB=db;
//          var list = quotes(json);
//      DB.collection('qcollection').insertMany(list,function(err,inserted){
//       cb(err,inserted);
       
//    } );}
// };





// exports.getQuotesFromJSON = function (index){
	
// 	var arr = quotesarray();
// 	return arr[index];
// };

// exports.seed = function(err,seeded){
// 	if(err){
// 		seeded=false;
// 		throw err;
// 	}
// 	mongo.connect('mongodb://127.0.0.1:27017/dbquote');
// 	var collection =db.collection('quotes');
// 	collection.insert(JSON.parse(json));
// 	seeded=true;
// };
// exports.getQuotesFromDB = (function (err, quotes) {
//     if(err){
//     	throw err;
//     }
//     mongo.connect('mongodb://127.0.0.1:27017/dbquote');
// 	return db.collection('quotes').find().toArray();
// });

// exports.getQuotesFromDB = (function(function (err, quotes) {
//     if(err){
//     	throw err;
//     }
//     mongo.connect('mongodb://127.0.0.1:27017/dbquote');
// 	var list = db.collection('quotes').find().toArray();
//     return list[index];
// }), index);
