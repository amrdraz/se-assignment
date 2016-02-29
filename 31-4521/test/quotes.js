var assert = require('chai').assert;
// var should = require('chai').should;
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
    var arrayElem = Quote.getElementByIndexElseRandom(arr);
    assert.include(arr, arrayElem, 'array contains value');
  });
  it("should return the first element if we also pass the index 0", function() {
    var firstElem = Quote.getElementByIndexElseRandom(arr, 0);
    assert.equal(firstElem, arr[0]);
  });
  it("should return the last element if we also pass the index", function() {
    var lastElem = Quote.getElementByIndexElseRandom(arr, arr.length - 1);
    assert.equal(lastElem, arr[arr.length - 1]);

  });
});

describe("getQuotesFromJSON", function() {
  it("should return an array of 102 quote", function() {
    assert.lengthOf(Quote.getQuotesFromJSON(), 102);

    // TODO: you know how many quotes are there
  });
  it("first quote in the array's author should be Kevin Kruse", function() {
    var firstElem = Quote.getQuotesFromJSON()[0];
    assert.sameDeepMembers([firstElem], [{
      "author": "Kevin Kruse",
      "text": "Life isn’t about getting and having, it’s about giving and being"
    }]);
    // TODO: you know the content of first quote
  });
});

describe("getQuoteFromJSON", function() {
  it('should return a quote object with an author and text property', function() {
    var randomQuote = Quote.getQuoteFromJSON();
    assert.deepProperty(randomQuote, 'text');
    assert.deepProperty(randomQuote, 'author');

    // TODO: check that the returned quote has text and author
  });
  it('should return a random quote if index not specified', function() {
    var randomQuote = Quote.getQuoteFromJSON();
    var allQuotes = Quote.getQuotesFromJSON();
    assert.includeDeepMembers(allQuotes, [randomQuote]);
    // TODO: is the returned quote in the all quotes array?
  });
  it('should return the first quote if we pass 0', function() {
    var firstElem = Quote.getQuoteFromJSON(0);
    var allQuotes = Quote.getQuotesFromJSON();
    assert.sameDeepMembers([firstElem], [allQuotes[0]]);
    // TODO: you know the content of first quote
  });
});

// quotes collection should be called quotes
describe('seed', function() {
  before(db.clearDB);
  it('should populate the db if db is empty returning true', function(done) {
    Quote.seed(function(err, seeded) {
      assert.equal(seeded, true);
      done();
    });
    // TODO: assert that seeded is true
  });
  it('should have populated the quotes collection with 102 document', function(done) {
    var quotesArray = Quote.getQuotesFromDB(function(err, data) {
      assert.lengthOf(data, 102);
      done();
    });
    // TODO: check that the database contains 102 document
  });
  it('should not seed db again if db is not empty returning false in the callback', function(done) {
    Quote.seed(function(err, seeded) {
      assert.equal(seeded, false);
      done();
    });
    // TODO: assert that seeded is false
  });
  it('should not seed db again if db is not empty', function(done) {
    Quote.seed(function() {
      var quotesArray = Quote.getQuotesFromDB(function(err, data) {
        assert.lengthOf(data, 102);
        done();
      });
    });
    // TODO: The database should have 102 quote still
  });
});

describe('getQuotesFromDB', function() {
  it('should return all quote documents in the database', function(done) {
    Quote.getQuotesFromDB(function(err, data) {
      assert.lengthOf(data, 102);
      done();
    });
    // TODO: there should be 102 documents in the db
  });
});

describe('getQuoteFromDB', function() {
  it('should return a random quote document', function(done) {
    Quote.getQuotesFromDB(function(err, quotes) {
      Quote.getQuotesFromDB(function(err, quote) {
        assert.includeDeepMembers(quotes, [quote]);
        done();
      }, Math.floor((Math.random() * quotes.length) + 0));
    });
    // TODO: see if it returns on of the quotes from all quotes
  });
  it('should return the first quote if passed 0 after callback', function(done) {
    var firstQuote = {
      'quote': {
        "author": "Kevin Kruse",
        "text": "Life isn’t about getting and having, it’s about giving and being"
      }
    };
    Quote.getQuotesFromDB(function(err, quote) {
      assert.equal(quote.quote.text, firstQuote.quote.text);
      assert.equal(quote.quote.author, firstQuote.quote.author);
      done();
    }, 0);
    // TODO: you know the content of object in the file
  });
});

describe('API', function() {
      request = request(app.app);
      it("should return a 404 for urls that don't exist", function(done) {
        request
          .get('/user')
          .expect(404, done);
        // TODO: test with supertest
      });

      it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
          request
            .get('/api/quote')
            .set('Accept','application/json')
            .expect(200)
            .end(function(err,res) {
              assert.deepProperty(res.body.quote, '_id');
              assert.deepProperty(res.body.quote, 'text');
              assert.deepProperty(res.body.quote, 'author');
              done();
            });
              // TODO: test with supertest
            });

        it('/api/quotes should return an array of JSON object when I visit', function(done) {
          request
            .get('/api/quotes')
            .set('Accept','application/json')
            .expect(200)
            .end(function(err,res) {
              assert.lengthOf(res.body, 102);
              done();
            });
          // TODO: test with supertest
        });
      });
