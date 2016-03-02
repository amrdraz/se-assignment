// tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
    db.connect
    (function(err, db) {
       if (err) return done(err);
        else done();
     });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var returnedValue=Quote.getElementByIndexElseRandom(arr);
        assert.include(arr,returnedValue);
    });
    it("should return the first element if we also pass the index 0", function() {
        var returnedValue = Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(returnedValue,1);
    });
    it("should return the last element if we also pass the index", function() {
        var returnedValue=Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(returnedValue,5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
       var arr= Quote.getQuotesFromJSON();
       assert.lengthOf(arr,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
      var arr=Quote.getQuotesFromJSON();
      var firstQuote= arr[0].author;
      assert.equal(firstQuote,"Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
      var quotesObject=Quote.getQuoteFromJSON(1);
      assert.isNotNull(quotesObject.text);
      assert.isNotNull(quotesObject.author);
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
        var quotesObject= Quote.getQuoteFromJSON();
        //assert.include(Quote,quotesObject); Leh la2??!
        var allQuotes= Quote.getQuotesFromJSON();
        assert.include(allQuotes,quotesObject);
      

    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var quotesObject= Quote.getQuoteFromJSON(0);
        var allQuotes= Quote.getQuotesFromJSON();
        assert.equal(quotesObject.text,allQuotes[0].text);
        assert.equal(quotesObject.author,allQuotes[0].author);
    });
});

// // quotes collection should be called quotes
describe('seed', function() {
   before(db.clearDB);//lazem y3mlha clear el awel
    it('should populate the db if db is empty returning true', function(done) {
         // TODO: assert that seeded is true
            Quote.seed(function(error,seededFlag){
                assert.isTrue(seededFlag);
                done();
});
            
        
     });
     it('should have populated the quotes collection with 102 document', function(done) {
         // TODO: check that the database contains 102 document
        Quote.getQuotesFromDB(function(error,quotes){
            assert.lengthOf(quotes,102);
            done();
        });
         
     });
     it('should not seed db again if db is not empty returning false in the callback', function(done) {
         // TODO: assert that seeded is false
         Quote.seed(function(error,seededFlag){
            assert.isFalse(seededFlag);
            done();
         })
     });
     it('should not seed db again if db is not empty', function(done) {
         // TODO: The database should have 102 quote still
         Quote.getQuotesFromDB(function(error,quotes){
            assert.lengthOf(quotes,102);
            done();
        });
     });
 });
 var callback1=function(error,seededFlag){
                assert.isTrue(seededFlag);
}

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(error,quotes){
            assert.lengthOf(quotes,102);
            done();
        });
    });
});


describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
       Quote.getQuoteFromDB(function(error,quote){
        var allQuotes= Quote.getQuotesFromJSON();
        assert.include(allQuotes,quote);
        done();
       });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        var allQuotes= Quote.getQuotesFromJSON();
        var firstQuote = Quote.getElementByIndexElseRandom(allQuotes,0);
       var returnedValue= Quote.getQuoteFromDB(function(error,quote){
        assert.equal(returnedValue,firstQuote);
       },0);
       done();
        
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest

      request.get('/ayhabal')
      .expect(function(res) {
        assert.equal(res.satus,404);
        
      })
      done();
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
  
      request.get('/api/quote')
      .expect(function(res) {
        assert.isDefined(res.body.text);
        assert.isDefined(res.body.author);
      })
      done();
      
  });
      it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
          request.get('/api/quotes')
            .expect(function(res) {
            assert.typeOf(res.body[0],'JSON');
            
      })
      done();
    });
});