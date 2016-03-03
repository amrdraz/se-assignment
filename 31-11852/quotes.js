var fs = require('fs'); 
var DB = require('./db.js'); 

exports.getElementByIndexElseRandom = function (arr, index){  
    var element = null;
   if(index != null){  
    element= arr[index];
     
   } 
   else{ 
    element= arr[Math.floor(Math.random()*arr.length)];

   }
     return element;
} 

exports.getQuotesFromJSON = function(){ 

var alldata = JSON.parse(fs.readFileSync('./quotes.json'));   
//console.log(alldata[0]);
     return alldata;

} 

exports.getQuoteFromJSON = function(index){  
     var quote = null;
	    var alldata =exports.getQuotesFromJSON();
        if(index != null){  
           quote = alldata[index];
             } 
        else{ 
   
     quote = alldata[Math.floor(Math.random()*alldata.length)];

        } 
            return quote;
	
}

exports.seed = function(cb){  
     var alldata=exports.getQuotesFromJSON(); // should populate DB with JSON 
     DB.db().collection('QuotesDB').count(function(err,count) { 
       if(count===0){  
        DB.db().collection('QuotesDB').insertMany(alldata, function(err,seeded){ 
          
              if(err){ 
                  cb(err,false);
               }
             else{ 
                  cb(null,true);
             }
         
      }); 

       }  
      
       else {

            cb(null,false);
       }   
      });

  }
  
exports.getQuotesFromDB=function(cb){   
           
           DB.db().collection('QuotesDB').find().toArray(function  (err, alldata) {
             if(err){
              cb(err,alldata);
             }
             else{
              cb(null,alldata);
             }
             
           }); 
           //if(err){ 
                  //cb(err);
               //}
             //else{ 
                  //cb(null);
             //}
 
  }
        

exports.getQuoteFromDB = function(cb,index){  
 //console.log(alldata[0]);
  exports.getQuotesFromDB(function(err,result){ 
  if(err){
     cb(err,null);
  } 
  else{ 
  if(index != null){ 
    element = result[index];
       
  }  
  else { 

     element=result[Math.floor(Math.random()*result.length)]; 
  } 
}
  
    cb(null,element)
}); 

    
}