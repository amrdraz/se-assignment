var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

function indexOf(JSONArray, JSONObject){
  JSONObject = JSON.stringify(JSONObject);
  for (var i = 0; i < JSONArray.length; i++) {
    if(JSON.stringify(JSONArray[i]) === JSONObject){
      return i;
    }
  }

  return -1;
}

before(function(done) {
  db.connect(function(err, db) {
    if(err) {
      return done(err);
    }
    else {
      done();
    }
  });
});

describe("getElementByIndexElseRandom", function() {
  var arr = [1, 2, 3, 43, 5];
  it("should return a random element that is included in the array if we omit the index", function() {
    assert.equal(arr.indexOf(Quote.getElementByIndexElseRandom(arr)) != -1, true);
  });
  it("should return the first element if we also pass the index 0", function() {
    assert.equal(Quote.getElementByIndexElseRandom(arr, 0), arr[0]);
  });
  it("should return the last element if we also pass the index", function() {
    assert.equal(Quote.getElementByIndexElseRandom(arr, (arr.length - 1)), arr[(arr.length - 1)]);
  });
});

describe("getQuotesFromJSON", function() {
  it("should return an array of 102 quote", function() {
    assert.equal(Quote.getQuotesFromJSON().length, 102);
  });
  it("first quote in the array's author should be Kevin Kruse", function() {
    assert.equal(Quote.getQuotesFromJSON()[0].author, 'Kevin Kruse');
  });
});

describe("getQuoteFromJSON", function() {
  it('should return a quote object with an author and text property', function() {
    var quote = Quote.getQuoteFromJSON();
    assert.equal(typeof quote.author != "undefined" && typeof quote.text != "undefined", true);
  });
  it('should return a random quote if index not specified', function() {
    var allQuotes = Quote.getQuotesFromJSON();
    var quote = Quote.getQuoteFromJSON();

  });
  it('should return the first quote if we pass 0', function() {
    var firstQuote = Quote.getQuotesFromJSON()[0];
    var quote = Quote.getQuoteFromJSON(0);
    assert.equal(quote.text === firstQuote.text && quote.author === firstQuote.author, true);
  });
});

// quotes collection should be called quotes
describe('seed', function() {
  before(db.clearDB);
  it('should populate the db if db is empty returning true', function(done) {
    Quote.seed(function(err, seeded) {
      if(err)
      throw err;

      assert.equal(seeded, true);
      done();
    });
  });
  it('should have populated the quotes collection with 102 document', function(done) {
    var database = db.db();
    var collection = database.collection('quotes');

    collection.count(function(err, count) {
      if(err)
      throw err;

      assert.equal(count, 102);
      done();
    });
  });
  it('should not seed db again if db is not empty returning false in the callback', function(done) {
    Quote.seed(function(err, seeded) {
      if(err)
      throw err;

      assert.equal(seeded, false);
      done();
    });
  });
  it('should not seed db again if db is not empty', function(done) {
    var database = db.db();
    var collection = database.collection('quotes');

    collection.count(function(err, count) {
      if(err)
      throw err;

      assert.equal(count, 102);
      done();
    });
  });
});


describe('getQuotesFromDB', function() {
  it('should return all quote documents in the database', function(done) {
    Quote.getQuotesFromDB(function(err, quotes) {
      if(err)
      throw err;

      assert.equal(quotes.length, 102);
      done();
    });
  });
});

describe('getQuoteFromDB', function() {
  it('should return a random quote document', function(done) {
    Quote.getQuoteFromDB(function(err, quote) {
      if(err)
      throw err;

      Quote.getQuotesFromDB(function(err, quotes) {
        if(err)
        throw err;

        assert.equal(indexOf(quotes, quote) != -1, true);
        done();
      });
    });
  });
  it('should return the first quote if passed 0 after callback', function(done) {
    Quote.getQuoteFromDB(function(err, quote) {
      if(err)
      throw err;

      Quote.getQuotesFromDB(function(err, quotes) {
        if(err)
        throw err;

        assert.equal(JSON.stringify(quotes[0]) === JSON.stringify(quote), true);
        done();
      });
    }, 0);
  });
});

describe('API', function() {
  request = request(app);
  it("should return a 404 for urls that don't exist", function(done) {
    request.get('/kareem').expect(404, done); 
  });

  it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
    request.get('/api/quote').
    expect('Content-Type', 'application/json; charset=utf-8').
    expect(200).
    end(function(err, response) {
      if(err)
      throw err;

      var quote = JSON.parse(response.text);
      assert.equal(typeof quote.author != "undefined" && typeof quote.text != "undefined" && typeof quote._id != "undefined", true);
      done();
    });
  });

  it('/api/quotes should return an array of JSON object when I visit', function(done) {
    request.get('/api/quotes').
    expect('Content-Type', 'application/json; charset=utf-8').
    expect(200).
    end(function(err, response) {
      if(err)
      throw err;

      var quotes = JSON.parse(response.text);
      assert.equal(Array.isArray(quotes), true);
      done();
    });
  });
});
