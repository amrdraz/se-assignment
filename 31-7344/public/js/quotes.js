    var $quote = document.querySelector('.quote');
    var $author = document.querySelector('.author');
    //Gson gson = new GSon();
    //String orgChartUsers = gson.toJson(quotes);
    //var json = JSON.parse(data);
   /** var url = 'mongodb://localhost:27017/myproject';
    var http = require('http');
    var fs = require('fs');
    var mongo = require('mongodb').MongoClient;
    var assert = require('assert');
    var DB;
    
    **/

    function getElementByIndexElseRandom(array, index) {
        if(index==null){
            index = Math.ceil(Math.random() * array.length-1);
        }
        
        return array[index];
 
    }

    fetch('/quotes.json').then(function getQuotesFromJSON(res){
        return res.json();}).then(function getQuoteFromJSON(quotes) {

            document.body.addEventListener('click', function(event) {     
            var quote = getElementByIndexElseRandom(quotes);
            document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'
            $author.innerHTML = quote.author;
            $quote.innerHTML = quote.text;
            
        });
    });
/**
MongoClient.connect(url, seed(function (err, seeded) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  insertDocuments(seeded, function() {
    seeded.close();
  });
}));
       **/