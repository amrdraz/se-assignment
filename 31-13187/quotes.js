var db = require('./db.js');
//db.connect();
//db = db.db();
var quotes = require("../quotes.json");
exports.getQuotesFromJSON =function (){
   return quotes ; 
}

exports.getQuoteFromJSON =  function ( n ){

     return exports.getElementByIndexElseRandom(quotes,n);
     }




 exports.seed = function ( cb){
    db.db().collection('data').count(function(err,count){
      if(count!=0){
        cb(null,false);
                    console.log(count);}
                        else
                {
       db.db().collection('data').insertMany(quotes,function (err){
            if(err)
                cb(err,false);


            else
            cb(err,true);
    });
            
    
   
}});


}



exports.getQuoteFromDB =function  (cb,index) {
 db.db().collection('data').find().toArray(function (err,docs){
 if(err)
  cb(err,null);
else{
   var quote =exports.getElementByIndexElseRandom(docs,index);
   cb(err,quote);
   // console.log(docs[0]);
 }
 });

}
 
 exports.getQuotesFromDB  = function(cb) {
 db.db().collection('data').find().toArray(function (err,docs){
 if(err)
  cb(err,null);
else
   cb(null,docs);

 
 });

}

exports.getElementByIndexElseRandom =function (array,index){
    if(index==undefined){
        var random = Math.floor(Math.random()*array.length) ; 
        return array[random];
    }
        else
          console.log(array[index]);
         return array[index]   ;

}
