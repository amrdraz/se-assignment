
var quotesFile = require('/home/ibraheem/Assignment/quotes.json');
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/MyDB';
var DB = null;


var getQuotesArray = function(){
    var array = [];
    var keys = Object.keys(quotesFile);
    keys.forEach(function(key){
    array.push(quotesFile[key])
    });
    return array;
}

exports.getElementByIndexElseRandom = function(arr, index) {
    if (index == undefined) {
        var l = arr.length;
        var rand = Math.floor((Math.random() * l) + 1) - 1; 
        return arr[rand];
    } else {
        return arr[index];
    }
};

exports.getQuotesFromJSON = function(cb){
    var array = getQuotesArray();
    cb(null,array);
};

exports.getQuoteFromJSON = function(cb , index){

    if(index == undefined){
        var arr = getQuotesArray();
        var l = arr.length;
        var rand = Math.floor((Math.random() * l) + 1) - 1; 
        cb(null , arr[rand]);
    }

    else{
        var arr = getQuotesArray();
        return arr[index];
    }

};

exports.seed = function(cb){
        mongo.connect(url , function(err,DB){
            if(err){
                return cb(err,false);
            }
            else{

                DB.collection('quotes').find().toArray(function(err,docs){
                    if(!err){
                        if(docs.length == 0){
                            var array = getQuotesArray();
                            DB.collection('quotes').insertMany(array);
                            cb(null,true);
                        }
                        else{
                            cb(null,false);
                        }
                    }
                });

            }
        });
};

exports.getQuotesFromDB = function(cb) {

    mongo.connect(url , function(err,db){

         if(err){                               
         	console.log(err);
         } 
         else{
         		db.collection('quotes').find().toArray(function(err,docs){
                    cb(null,docs);
         		});
         }

    });

};

exports.getQuoteFromDB = function (cb , index) {

    if(index == undefined){
        mongo.connect(url , function(err,db){

         if(err){                               
            console.log(err);
         } 
         else{
                db.collection('quotes').find().toArray(function(err,docs){
                    var l = docs.length;
                    var rand = Math.floor((Math.random() * l) + 1) - 1;
                    cb(null,docs[rand]);
                });
         }

    });

    }

    else{
        mongo.connect(url , function(err,db){

         if(err){                               
            console.log(err);
         } 
         else{
                db.collection('quotes').find().toArray(function(err,docs){
                    cb(null,docs[index]);
                });
         }

    });
    }

};
