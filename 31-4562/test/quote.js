// quotes.js testing 

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');



describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var quote = Quote.getElementByIndexElseRandom(arr);
        assert(arr.indexOf(quote) > -1 , "Returned Elements which is not in the array");
    });
    it("should return the first element if we also pass the index 0", function() {
          var quote = Quote.getElementByIndexElseRandom(arr,0);
        assert(arr.indexOf(quote) == 0 , "Returned wrong element not the first element in the array /n" +quote+ " is returned");
    });
    it("should return the last element if we also pass the index", function() {
          var quote = Quote.getElementByIndexElseRandom(arr,arr.length-1);
        assert(arr.indexOf(quote) == arr.length-1 , "Returned wrong element which is not the last one in the array");
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
       var quotes = Quote.getQuotesFromJSON();
       assert(quotes.length == 102 , "cannot get quotes from json file");
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
      var quotes = Quote.getQuotesFromJSON();
      var firstQoute = quotes[0];
      assert(firstQoute.author == 'Kevin Kruse' , "Wrong returned first quote author ");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
       var quote = Quote.getQuoteFromJSON();
       assert.isObject(quote , "no object was returned");
       assert.property(quote,'author');
       assert.property(quote,'text' );
    });
    it('should return a random quote if index not specified', function() {
        var quotes = Quote.getQuotesFromJSON();
       var quote = Quote.getQuoteFromJSON();
       assert(quotes.indexOf(quote) >-1 , "a random qoute was not returned");

    });
    it('should return the first quote if we pass 0', function() {
          var quotes = Quote.getQuotesFromJSON();
         var quote = Quote.getQuoteFromJSON(0);
       assert(quotes.indexOf(quote) == 0 , "the first qoute was not returned");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
   

    it('should populate the db if db is empty returning true', function(done) {
             db.clearDB(function(){
              Quote.seed(function(error, seeded){
             assert(seeded == true, "seeded returns false when the database is em");
             done(); 
             }); 
        })
            
    });

    it('should have populated the quotes collection with 102 document', function(done) {
        var Database = db.db();
        var quotesCollection = Database.get('quotesCollection');
        quotesCollection.find({},{},function(err , result){
            assert(result.length == 102 , "Database still not populated");
            done();
        });
         
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
             Quote.seed(function(error, seeded){
             assert(seeded == false, "seeded return true when the database is not empty");
             done(); 
             });  
    });
    it('should not seed db again if db is not empty', function(done) {
        var Database = db.db();
        var quotesCollection = Database.get('quotesCollection');
        quotesCollection.find({},{},function(err , result){
            assert(result.length == 102 , "Database is populated again when it was not empty");
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {

        Quote.getQuotesFromDB(function(err,quotes){
        assert(quotes.length == 102 ,"Cannot get qoutes from database");
        done();
       });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
         Quote.getQuotesFromDB(function(err1,quotes){
       Quote.getQuoteFromDB(function(err2, quote){
        var check = false ;
        for(var i = 0 ; i< quotes.length ; i++){
            if(quotes[i].text == quote.text && quotes[i].author == quote.author){
                check = true;
                break;
            }
           
             
            }
            assert(check == true, "returned qoute doesnot match the quotes in the database");
        
       
        done();
       });
    });
     });
    it('should return the first quote if passed 0 after callback', function(done) {
            Quote.getQuotesFromDB(function(err1,quotes){
       Quote.getQuoteFromDB(function(err2, quote){
        assert(quotes[0].text == quote.text && quotes[0].author == quote.author , "returned qoute doesnot match the first quote in the database");
        done();
       } , 0);
    });

    });
});

describe('API', function() {
    
    it("should return a 404 for urls that don't exist", function(done) {
      request('/invalid_page', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
       
      });
      done();
  });
    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request('/api/quote', function(error, response, body) {
             assert.isObject(body, 'body is not a quote JSON object');
             assert.property(body, '_id');
             assert.property(body, 'text');
             assert.property(body, 'author');
            
      });
        done();
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
            request('/api/quotes', function(error, response, body) {
             assert.isArray(body, 'the body returned is not an array');

            
      });
        done();
    });

  });  
