var fs = require('fs'); 
var DB = require('./db.js'); 

exports.getElementByIndexElseRandom(array ,index){
	var x= array;
	var element;
   if(index== null){
   var element = x[Math.floor(Math.random() * x.length)];
   }
   else{
         element=x[index];
   }
   
   console.log(getElementByIndexElseRandom(["math","man","lol"],1); 
return x;


}
exports.getQuotesFromJSON = function(){ 

var data = JSON.parse(fs.readFileSync('./quotes.json'));   

     return alldata;

} 
exports.getQuoteFromJSON = function(index){  
     var q= null;
	    var data =exports.getQuotesFromJSON();
        if(index != null){  
           q= data[index];
             } 
        else{ 
   
     q= data[Math.floor(Math.random()*data.length)];

        } 
            return q;
	
}