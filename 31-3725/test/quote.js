var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

db.connect(function(err, db) {
  if (err)
    return done(err);
  else
    done();
});

describe("getElementByIndexElseRandom", function() {

  var arr = [1, 2, 3, 43, 5];

  it("should return a random element from array if we omit the index", function() {
    var randomElement = Quote.getElementByIndexElseRandom(arr);
    assert.include(arr, randomElement, 'array contains value');
  });

  it("should return the first element if we also pass the index 0", function() {
    var element = Quote.getElementByIndexElseRandom(arr, 0);
    assert.equal(element, '1', "returns first element");
  });

  it("should return the last element if we also pass the index", function() {
    var element = Quote.getElementByIndexElseRandom(arr, arr.length - 1);
    assert.equal(element, '5', "returns last element");
  });

});

describe("getQuotesFromJSON", function() {

  it("should return an array of 98 quotes", function() {
    var arrayLength = Quote.getQuotesFromJSON().length;
    assert.equal(arrayLength, '98', "correct array length");
  });

  it("first quote in the array's author should be Kevin Kruse", function() {
    var firstQuoteAuthor = Quote.getQuotesFromJSON()[0].author;
    assert.equal(firstQuoteAuthor, 'Kevin Kruse', "correct first quote's author");
  });

});

describe("getQuoteFromJSON", function() {

  it('should return a quote object with an author and text property', function() {
    var randomQuote = Quote.getQuoteFromJSON();
    assert.property(randomQuote, 'text', 'text property maintained');
    assert.property(randomQuote, 'author', 'author property maintained');
  });

  it('should return a random quote if index not specified', function() {
    var randomQuote = Quote.getQuoteFromJSON();
    assert.include(Quote.jsonQuotes, randomQuote, 'array contains value');
  });

  it('should return the first quote if we pass 0', function() {
    var element = Quote.getQuoteFromJSON(0);
    assert.equal(element, Quote.jsonQuotes[0], "returns first element");
  });

});

describe('seed', function() {

  before(db.clearDB);

  it('should populate the db if db is empty returning true', function(done) {
    // TODO: assert that seeded is true
    done();
  });

  it('should have populated the quotes collection with 102 document', function(done) {
    // TODO: check that the database contains 102 document
    done();
  });

  it('should not seed db again if db is not empty returning false in the callback', function(done) {
    // TODO: assert that seeded is false
    done();
  });

  it('should not seed db again if db is not empty', function(done) {
    // TODO: The database should have 102 quote still
    done();
  });

});

describe('getQuotesFromDB', function() {

  it('should return all quote documents in the database', function(done) {
    // TODO: there should be 102 documents in the db
    done();
  });

});

describe('getQuoteFromDB', function() {

  it('should return a random quote document', function(done) {
    // TODO: see if it returns on of the quotes from all quotes
    done();
  });

  it('should return the first quote if passed 0 after callback', function(done) {
    // TODO: you know the content of object in the file
    done();
  });

});

describe('API', function() {

  request = request(app);

  it("should return a 404 for urls that don't exist", function(done) {
    done();
  });

  it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
    // TODO: test with supertest
    done();
  });

  it('/api/quotes should return an array of JSON object when I visit', function(done) {
    // TODO: test with supertest
    done();
  });

});
