var db = require('./db.js');
exports.getElementByIndexElseRandom= function getElementByIndexElseRandom(array , index){  
    if(index===undefined){
      var r = Math.floor(Math.random()*array.length);
      var x = array[r];
        
    }else{
        var x = array[index];
    }
    return x;
}
exports.getQuotesFromJSON= function getQuotesFromJSON(){
    var x = require('../quotes.json');
    return x; 
}
exports.getQuoteFromJSON= function getQuoteFromJSON(index){
    var x = this.getQuotesFromJSON();
    if(index===undefined){
        var y = this.getElementByIndexElseRandom(x);
    }else{
        var y = this.getElementByIndexElseRandom(x, index);
    }
    return y;
}
exports.seed =function seed(cb) {
    var x = this.getQuotesFromJSON();  
    db.db().collection('quotes').count(function(err, count){
        if(count !== 0)
          cb(err,false)
        else
         db.db().collection('quotes').insert(x, function(err){
            if (err) {
               cb(err, false); 
            } else {
                cb(err, true);
            }
        });
    });
}
exports.getQuotesFromDB = function getQuotesFromDB(cb){
  db.db().collection('quotes').find().toArray(cb);
}
exports.getQuoteFromDB = function getQuoteFromDB(cb, index){
    console.log("heeeere");
    var self = this;
    this.getQuotesFromDB(function (err,r){
        console.log(r);
        var x = self.getElementByIndexElseRandom(r,index);
        console.log(x);
        cb(err, x);
    })   
}

// var self = this;
// db.connect(function(err, db) {
//     self.seed(function(){
//       console.log("i did it :P")
//     })
// });

