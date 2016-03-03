var assert = require('chai').assert;
var expect = require('chai').expect;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
     db.connect(function(err, db) {
        if (err) return done(err);
        else done();
     });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function(done) {
        // TODO
        var c = Quote.getElementByIndexElseRandom(arr);
        assert.include(arr,c);
        done();
    });
    it("should return the first element if we also pass the index 0", function(done) {
        var c = Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(1,c);
        done();
    });
    it("should return the last element if we also pass the index", function(done) {
      var c = Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(5,c);
        done();
     });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function(done) {
        // TODO: you know how many quotes are there
        var arr=Quote.getQuotesFromJSON();
        assert.equal(102,arr.length);
        done();
    });
    it("first quote in the array's author should be Kevin Kruse", function(done) {
        // TODO: you know the content of first quote
        var arr=Quote.getQuotesFromJSON();
        var first=arr[0];
        assert.equal("Kevin Kruse",first.author);
        done();
    });
});


describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function(done) {
        // TODO: check that the returned quote has text and author
        var quote=Quote.getQuoteFromJSON();
        assert(undefined != quote.text);
        assert(undefined!=quote.author);
        done();
    });
    it('should return a random quote if index not specified', function(done) {
       // TODO: is the returned quote in the all quotes array?
       var arr=Quote.getQuotesFromJSON();
       var quote=Quote.getQuoteFromJSON();
       assert.include(arr,quote);
        done();
    });
    it('should return the first quote if we pass 0', function(done) {
        // TODO: you know the content of first quote
        var arr=Quote.getQuotesFromJSON();
        var first=arr[0];
        var quote=Quote.getQuoteFromJSON(0);
        assert.equal(first.author,quote.author);
        assert.equal(first.text,quote.text);
        done();

    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err,seeded){
            assert.equal(true,seeded);
            done();

        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.getQuotesFromDB(function(err,items){
          assert.equal(102,items.length);
          done();
   });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err,seeded){
            assert.equal(false,seeded);
            done();

        });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.getQuotesFromDB(function(err,items){
          assert.equal(102,items.length);
          done();
   });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err,items){
         assert.equal(102,items.length);
         done();
   });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuotesFromDB(function(err,items){
         Quote.getQuoteFromDB(function(err, quote) {
             assert.include(items,quote);
             done();
     });
   });

    });

    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuotesFromDB(function(err,items){
         Quote.getQuoteFromDB(function(err, quote) {
             assert.equal(items[0].author,quote.author);
             assert.equal(items[0].text,quote.text);
             done();
     },0);
   });
});
  });


  

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get("/dthj").expect(404);
        done();
        //expect(404);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        var j=request.get("/api/quote").expect(202);
         assert("undefined" != j.text);
          assert("undefined" != j.author);
           assert("undefined" != j._id);
        done();
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        var quotes=request.get("/api/quotes").expect(202);
        assert(102,quotes.length);
        done();
    });
    
});
