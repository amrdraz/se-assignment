







var jsA = require ("../quotes.json");
var data = require("./db.js");
var col = null;
var qu = require("./quotes.js");

function getElementByIndexElseRandom(array , index)
{
    if(index === undefined){
        var x = parseInt(Math.random()*(colors.length));
        return array[x];
    }
    else {
        return array[index];
    }
}

function getQuotesFromJSON(){
    return jsA;
}

function getQuoteFromJSON(index){
    return qu.getElementByIndexElseRandom(qu.getQuotesFromJSON(), index);
}


function seed(cb){
    /* col = data.db().collection("qu");
    col.count(function(err, seeded) {
        if(err){
            return cb(err, false);
        }
        if(seeded===0){
            for(var i=0; i<jsA.length; i++){
                col.insert(jsA[i]);
            }
            return cb(err, true);
        }
        else {
            return cb(err, false);
        }
    });*/


    var quotes= getQuotesFromJSON();
   var collection=db.db().collection("quotes");
   collection.count(function(err,seeded)
   {
       if(err)
           cb(err,false);
   
   if(seeded==0)
   {
       //console.log(seeded + " henaa");
       collection.insert(quotes,function(err,seeded)
           {
               cb(err,true);
               //console.log("ADDED!");
           });
       
   }
   else
       
   {
       //console.log("ERROR!");
       cb(err,false);
   }
   });
}


function getQuotesFromDB(cb) {
     data.db().collection("quotes").find().toArray(function(err,quotess){
        cb(err,quotess);
    });
    // any of quote object in the database  
};

function getQuoteFromDB(cb,index){
//return qu.getElementByIndexElseRandom(qu.getQuoteFromJSON(), index);
    data.db().collection("quotes").find().toArray(function(err,quo){
        cb(err,qu.getElementByIndexElseRandom(quo,index));
    });
}

exports.getElementByIndexElseRandom = getElementByIndexElseRandom
exports.getQuoteFromJSON = getQuoteFromJSON
exports.getQuotesFromJSON = getQuotesFromJSON
exports.seed = seed
exports.getQuoteFromDB = getQuoteFromDB
exports.getQuotesFromDB = getQuotesFromDB
