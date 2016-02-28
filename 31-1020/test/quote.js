// tests/quotes.js
// ./node_modules/mocha/bib/mocha ./test/quote.js

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

  before(function(done) {
     //use this after you have completed the connect function
     db.connect(function(db) {
       done();
    });

});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var element =Quote.getElementByIndexElseRandom(arr);
        
        for ( var i=0;i<arr.length;i++){
        if (arr[i]===element) return true;
      }
     return false;

    });

    it("should return the first element if we also pass the index 0", function() {
        var element =Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(element,arr[0]);

    });
    it("should return the last element if we also pass the index", function() {
        var element =Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(element,arr[4]);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var elements =Quote.getQuotesFromJSON();
        assert.equal(elements.length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var elements =Quote.getQuotesFromJSON();
        var name=elements[0].author;
        assert.equal('Kevin Kruse',name);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var quote = Quote.getQuoteFromJSON();
        var flag = (quote.text!==undefined) && (quote.author!==undefined);
        assert.equal(flag,true);
    });
    it('should return a random quote if index not specified', function() {
        var quote = Quote.getQuoteFromJSON();
        var arr = Quote.getQuotesFromJSON();
        var flag=false;

        for ( var i=0;i<arr.length;i++){
        if (arr[i]=== quote) flag = true;
      }  
        assert.equal(flag,true);

    });

    it('should return the first quote if we pass 0', function() {
        var quote =Quote.getQuoteFromJSON(0);
        var first = Quote.getQuotesFromJSON()[0];
        assert.equal(first,quote);
    });
});

  //quotes collection should be called quotes
  describe('seed', function() {
   before(db.clearDB);
   it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(error,seeded){
            assert(seeded,"DB error");
            done();
        });
   });
   it('should have populated the quotes collection with 102 document', function(done) {
       // TODO: check that the database contains 102 document
       Quote.seed(function(err, quotes){
            assert(quotes.length == 102, "population of quotes collection with 102 document failed");
            done();
       });
   });
   it('should not seed db again if db is not empty returning false in the callback', function(done) {
       // TODO: assert that seeded is false
       Quote.seed(function(error, seeded){
            assert(!seeded, "you are trying to populate the database again !!!");
            done();
       })
   });
   it('should not seed db again if db is not empty', function(done) {
       // TODO: The database should have 102 quote still
       Quote.getQuotesFromDB(function(err,quotes){
        assert(quotes.length == 102, 'the database supposed have 102 quote still !!!');
        done();
       });
       
   });
});

  describe('getQuotesFromDB', function() {
   it('should return all quote documents in the database', function(done) {
       // TODO: there should be 102 documents in the db
       Quote.getQuotesFromDB(function(err, quotes){
        assert(quotes.length == 102, "there should be 102 documents in the db but that did not happen !!!");
        //console.log(quotes.length);
        done();       
       });
   });
});

describe('getQuoteFromDB', function() {
   it('should return a random quote document', function(done) {
       // TODO: see if it returns on of the quotes from all quotes
       Quote.getQuotesFromDB(function(err, quotes){
            Quote.getQuoteFromDB(function(error, quote){
                    var flag = false;
                    for(var i=0; i<quotes.length;i++){
                        if(quotes[i].author === quote.author && quotes[i].text === quote.text){
                            flag = true;
                            break;
                        }
                    }

                    assert(flag, "the quote doed not exist !!!");
                    done();
            });
       });
   });
   it('should return the first quote if passed 0 after callback', function(done) {
       // TODO: you know the content of object in the file
       Quote.getQuotesFromDB(function(err, quotes){
            Quote.getQuoteFromDB(function(error, quote){
                    assert(quote.author == quotes[0].author && quote.text == quotes[0].text,"error");
                    done();
            },0);
       });
   });
});

describe('API', function() {
   request = request(app);
   it("should return a 404 for urls that don't exist", function(done) {
       // TODO: test with supertest
   });

   it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
       // TODO: test with supertest
   });

   it('/api/quotes should return an array of JSON object when I visit', function(done) {
       // TODO: test with supertest
   });
});