// tests/quotes.js

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
        assert.include(arr, Quote.getElementByIndexElseRandom(arr));
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.strictEqual(1, Quote.getElementByIndexElseRandom(arr, 0));
    });
    it("should return the last element if we also pass the index", function() {
        assert.strictEqual(5, Quote.getElementByIndexElseRandom(arr, 4));
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        assert.strictEqual(102, Quote.getQuotesFromJSON().length);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
      assert.deepEqual(Quote.getQuotesFromJSON()[0].author, 'Kevin Kruse' );
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
      assert.property(Quote.getQuoteFromJSON(), 'author');
      assert.property(Quote.getQuoteFromJSON(), 'text');
    });
    it('should return a random quote if index not specified', function() {
      var selection = Quote.getQuoteFromJSON();
      assert.isObject(selection);
      assert.property(selection, 'author');
      assert.property(selection, 'text');
    });
    it('should return the first quote if we pass 0', function() {
        var selection = Quote.getQuoteFromJSON(0);
        assert.deepEqual(selection.author, "Kevin Kruse");
        assert.deepEqual(selection.text, "Life isn’t about getting and having, it’s about giving and being");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
          Quote.seed( function(err,seeded){
            if(err) return done(err);
            assert.strictEqual(seeded,true);
            done();
          });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
      db.db().collection('quotes').count(function (err, count){
        if(err) return done(err);
        assert.strictEqual(count,102);
        done();
      });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
      Quote.seed( function(err,seeded){
        if(err) return done(err);
        assert.strictEqual(seeded,false);
        done();
      });
    });
    it('should not seed db again if db is not empty', function(done) {
      db.db().collection('quotes').count(function (err, count){
        if(err) return done(err);
        assert.strictEqual(count,102);
        done();
      });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
      Quote.getQuotesFromDB(function(err, quotes){
        if(err) return done(err);
        assert.strictEqual(quotes.length,102);
        done();
      });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
      Quote.getQuoteFromDB(function(err, selection){
        if(err) return done(err);
        assert.isObject(selection);
        assert.property(selection, 'author');
        assert.property(selection, 'text');
        done();
      });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
      Quote.getQuoteFromDB(function(err, selection){
        if(err) return done(err);
        assert.deepEqual(selection.author, "Kevin Kruse");
        assert.deepEqual(selection.text, "Life isn’t about getting and having, it’s about giving and being");
        done();
      },0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
      request.get('/A-Universe-where-I-am-not-bored').set('Accept', 'application/json')
      .expect(404)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
      request.get('/api/quote').set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        assert.property(res.body, '_id');
        assert.property(res.body, 'author');
        assert.property(res.body, 'text');
        done();
      });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {

      request.get('/api/quotes').expect(200).end(function(err, res){
        if (err) return done(err);
        assert.isArray(res.body, 'what kind of tea do we want?');
        done();
      });
    });
});
