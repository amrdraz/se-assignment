// tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

// before(function(done) {
//     // use this after you have completed the connect function
//     db.connect(function(err, db) {
//        if (err) return done(err);
//        else done();
//     });
// });

function contains(array, json) {
    var element = JSON.stringify(json); 
    for (i = 0; i < array.length; i++)
    {
        if (JSON.stringify(array[i]) === element)
            return true;
    }
    return false;
}

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        // TODO
        var element = Quote.getElementByIndexElseRandom(arr);
        assert(arr.indexOf(element) > -1, 'You should return a value in the array');
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
        var element = Quote.getElementByIndexElseRandom(arr, 0);
        assert.equal(element ,arr[0], 'you should return the first element in the array');
    });
    it("should return the last element if we also pass the index", function() {
        // TODO
        var element = Quote.getElementByIndexElseRandom(arr, arr.length-1);
        assert.equal(element, arr[arr.length-1], 'you should return the last element in the array');
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        var quotes = Quote.getQuotesFromJSON();
        assert.equal(102, quotes.length, 'You should return 102 elements');
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        assert.equal(Quote.getQuotesFromJSON()[0].author, 'Kevin Kruse', 'You should return the author of the very first quote');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var quote = Quote.getQuoteFromJSON();
        assert(typeof(quote.text) != "undefined" && typeof(quote.author) != "undefined", 'The returned quote should should have an author and a text');
    });
    it('should return a random quote if index not specified', function() { // return
       // TODO: is the returned quote in the all quotes array?
        var quote = Quote.getQuoteFromJSON();
        var quotesArray = Quote.getQuotesFromJSON();
        assert(contains(quotesArray, quote), 'The returned quote should be from the quotes.json file');
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var quote = Quote.getQuoteFromJSON(0);
        var firstQuote = { "author": "Kevin Kruse", "text": "Life isn’t about getting and having, it’s about giving and being"};
        assert(quote.text === firstQuote.text && quote.author === firstQuote.author, "You should return the very first quote");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err, seeded) {
            if (err) throw err;
            assert(seeded, 'You should have filled the database so seeded should be true');
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        db.db().collection('quotes').count(function(err, count) {
            if (err) throw err;
            assert.equal(count, 102, 'The database should have 102 entries');
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err, seeded) {
            if (err) throw err;
            assert(!seeded, 'You shouldn\'t fill the database again');
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        db.db().collection('quotes').count(function(err, count) {
            if (err) throw err;
            assert.equal(count, 102, 'The database should have 102 entries');
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err, docs) {
            if (err) throw err;
            assert.equal(docs.length, 102, 'You should get all quotes from the database');
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns one of the quotes from all quotes
        Quote.getQuoteFromDB(function(err, quote) {
            Quote.getQuotesFromDB(function(err, docs) {
                assert(contains(docs, quote), 'You should return a quote from the database');
                done();
            });
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB(function(err, quote) {
            var firstQuote = { "author": "Kevin Kruse", "text": "Life isn’t about getting and having, it’s about giving and being"};
            assert(quote.author == firstQuote.author && quote.text == firstQuote.text, 'You should return the first object in the database');
            done();
        }, 0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
            request
              .get('/in')
              .expect('Content-Type', 'text/html; charset=utf-8')
              .expect(404, done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request
          .get('/api/quote')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .end(function(err, res){
            if (err) throw err;
            res = JSON.parse(res.text);
            assert(typeof res.author != "undefined" && typeof res.text != "undefined" && res._id != "undefined", 'You should return a json object with an author and a text');
            done();
          });
      });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request
          .get('/api/quotes')
          .expect('Content-Length', 15423)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200, done);
    });
});
