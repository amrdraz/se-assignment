// tests/quotes.js
var assert = require('chai').assert;
var expect = require('chai').expect;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
  db.connect(function(db, err) {
      done();
  });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    var fn = Quote.getElementByIndexElseRandom;
    it("should return a random element that is included in the array if we omit the index", function() {
        assert.include(arr, fn(arr), 'Random item must be in the array');
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.strictEqual(1, fn(arr,0), 'It returned the 1st element');
    });
    it("should return the last element if we also pass the index", function() {
      assert.strictEqual(5, fn(arr,4), 'It returned the last element');
    });

});

describe("getQuotesFromJSON", function() {
    var fq = Quote.getQuotesFromJSON();
    it("should return an array of 102 quote" , function() {
      assert.lengthOf(fq,102, 'array has length of 102');
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
      assert.strictEqual("Kevin Kruse", fq[0]["author"],'His name is Kevin Kruse')
    });
});

describe("getQuoteFromJSON", function() {
    var obj = Quote.getQuoteFromJSON;
    it('should return a quote object with an author and text property' , function() {
      expect(obj()).to.have.property("author");
      expect(obj()).to.have.property("text");
    });
    it('should return a random quote if index not specified', function() {
        assert.include(Quote.getQuotesFromJSON(), obj() ,'Random quote in the file ' );
    });
    it('should return the first quote if we pass 0', function() {
      var tmp = obj(0);
      assert.strictEqual("Kevin Kruse", tmp["author"],'His name is Kevin Kruse')
      assert.strictEqual("Life isn’t about getting and having, it’s about giving and being", tmp["text"],'the quote')
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    var se =Quote.seed
    it('should populate the db if db is empty returning true', function(done) {
      se(function (err, seed){
        assert.isTrue(seed, 'db is empty');
        done();

      });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        db.connect( function (_db){
          _db.collection("quotes").find({}).count( function (err , c){
            assert.strictEqual( 102,c,'database contains 102 document');
            done();
          });
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        se(function (err, seed){
          assert.isNotTrue(seed, 'db is full');
          done();

        });
    });
    it('should not seed db again if db is not empty', function(done) {
        db.connect( function (_db){
          _db.collection("quotes").find({}).count( function (err , c){
            assert.strictEqual( 102,c,'database contains 102 document');
            done();
          });
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
      db.connect( function (_db){
        Quote.getQuotesFromDB(function(err, quotes){
            assert.strictEqual( 102,quotes.length,'database contains 102 document');
            done();

        });
      });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
      db.connect( function (_db){
        Quote.getQuotesFromDB(function(err, quotes){
          Quote.getQuoteFromDB(function(err, quote){
            assert.include(quotes,quote,'In quotes');
            done();


          });
        });
      });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
      db.connect( function (_db){
          Quote.getQuoteFromDB(function(err, quote){
            assert.strictEqual("John Lennon", quote["author"],'His name is Kevin Kruse'); //the first in my DB
            assert.strictEqual("When I was 5 years old, my mother always told me that happiness was the key to life.  When I went to school, they asked me what I wanted to be when I grew up.  I wrote down ‘happy’.  They told me I didn’t understand the assignment, and I told them they didn’t understand life", quote["text"],'the quote');
            done();
          } , 0);
        });
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
      request.get("/notdefined").set("Accept", "text/html").expect(404).end(function(err,res){
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
