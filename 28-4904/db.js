var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient;
var dburl = 'mongodb://localhost:27017/app';
var assert = require('assert');
var DB = null;

exports.connect = function(cb)
{
    MongoClient.connect(dburl, function(err, db) 
    {
        DB = db;
        var quotes = DB.collection('quotes').find().toArray(function(err, docs) 
        {
            var intCount = docs.length;
             if (intCount > 0) 
             {
                var strJson = "[";
                for (var i = 0; i < intCount;) 
                {
                strJson += strJson = '{"author": "' + docs[i].author + '","text": "' + docs[i].text + '"}';
                i = i + 1;
                    if (i < intCount) 
                    {
                        strJson += ',';
                    }
                }
                strJson += ']';
                cb( strJson );
                //console.log(strJson);
             }
        });
    });
}

exports.db = function() 
{
  if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

exports.clearDB = function(done) 
{
    DB.listCollections().toArray().then(function (collections) 
    {
      collections.forEach(function (c) 
      {
         DB.collection(c.name).removeMany();   
      });
      done();
    }).catch(done);
};

/*
Try 1

var collection = db.collection('quotes').find();
      collection.toArray(function(err,result)
      {
        
      });

*/