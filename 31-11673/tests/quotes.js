
var assert = require('chai').assert;
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
    it("should return a random element that is included in the array if we omit the index", function() {
        var random = Quote.getElementByIndexElseRandom(arr);
 +        assert.include(arr , random , "okay:D");
    });
    it("should return the first element if we also pass the index 0", function() {
        var actual = Quote.getElementByIndexElseRandom(arr , 0);
         assert.equal(actual , arr[0] , "okay:D");
    });
    it("should return the last element if we also pass the index", function() {
        var actual = Quote.getElementByIndexElseRandom(arr , 4);
         assert.equal(actual , arr[4] , "okay!!:D");
    });
});

describe("getQuotesFromJSON", function() {
    var quotes = Quote.getQuotesFromJSON();
    it("should return an array of 102 quote", function() {
        assert.equal(quotes.length,102,"okay")
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(quotes[0].author ,'kevin kruse');
    });
});

describe("getQuoteFromJSON", function() {
    var quote = Quote.getQuoteFromJSON();
    var all   = Quote.getQuotesFromJSON();
    it('should return a quote object with an author and text property', function() {
            assert.property(quote,'author');
            assert.property(quote.text,'text');
        });
    // it('should return a random quote if index not specified', function() {
            // assert.include(quotes , quote , "okay");
    // });
    it('should return the first quote if we pass 0', function() {
          var quote = quotes[0];
 +        var x = Quote.getQuoteFromJSON(0);
 +        assert.equal(quote , x , "okay");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err , seeded){
           assert.isTrue(seeded , "okay");
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.getQuotesFromDB(function(err , docs){
           assert.equal(docs.length , 102 , "okay");
          done();
       });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
          Quote.seed(function(err , seeded){
            assert.isNotTrue(seeded , "okay");
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
          Quote.getQuotesFromDB(function(err , docs){
            assert.equal(docs.length , 102 , "okay");
            done();
        });
     });
 });

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
       
    });
});

describe('getQuoteFromDB', function() {
    it(Quote.getQuotesFromDB(function(err, docs){
            assert.equal(docs.length, 102);
             done(err);
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
          Quote.getQuotesFromDB(function(err , docs){
          Quote.getQuoteFromDB(function(err , doc){
          assert.include(docs , doc , "okay");
                done();
           });
         });
    });
});


  describe('API', function() {
  request = request(app);
  it("should return a 404 for urls that don't exist", function(done) {
  request.get("/blabla").set("Accept","text/html").expect(404).end(function(err,res){
        done();
     });
     });
     it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
       request.get("/api/quote").set("Accept", "application/json").expect(200).end(function(err,res){
            expect(res.body).to.have.property("author");
            expect(res.body).to.have.property("text");
            expect(res.body).to.have.property("_id");
            done();
         });
       });
 
     it('/api/quotes should return an array of JSON object when I visit', function(done) {
      request.get("/api/quotes").set("Accept", "application/json").expect(200).end(function(err,res){
            expect(res.body).to.be.a('array');
            done();
     });
    });
  });