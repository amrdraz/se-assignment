
var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    db.connect(function(err, db) {
       if (err) return done(err);
       else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var elem = Quote.getElementByIndexElseRandom(arr);
        assert.include(arr, elem);
    });
    it("should return the first element if we also pass the index 0", function() {
        var elem = Quote.getElementByIndexElseRandom(arr, 0);
        assert.equal(arr[0], elem);
    });
    it("should return the last element if we also pass the index", function() {
        var elem = Quote.getElementByIndexElseRandom(arr, arr.length-1);
        assert.equal(arr[arr.length-1], elem);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        var quotes = Quote.getQuotesFromJSON();
        assert.equal(102, quotes.length);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var quotes = Quote.getQuotesFromJSON();
        assert.equal('Kevin Kruse', quotes[0].author);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var quote = Quote.getQuoteFromJSON();
        assert.isDefined(quote.author);
        assert.isDefined(quote.text);
    });
    it('should return a random quote if index not specified', function() {
        var quote = Quote.getQuoteFromJSON();
        var quotes = Quote.getQuotesFromJSON();
        assert.include(quotes, quote);
    });
    it('should return the first quote if we pass 0', function() {
        var quote = Quote.getQuoteFromJSON(0);
        var quotes = Quote.getQuotesFromJSON();
        assert.equal(quotes[0], quote);
    });
});

describe('seed', function() {
    before(function(done) {
        db.clearDB(function() {
            console.log('cleared');
            done();
        });
    });
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err, se) {
            assert.isTrue(se);
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        db.db().collection('quotes').count(function(err, cn) {
            assert.equal(cn, 102);
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err, se) {
            assert.isFalse(se);
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        Quote.seed(function(err, se) {
            assert.isFalse(se);
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, quotes) {
            assert.equal(quotes.length, 102);
            done();
        })
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(err, quote) {
            assert.isNull(err);
            Quote.getQuotesFromDB(function(err, quotes) {
                assert.include(quotes, quote);
                done();
            })
        })
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function(err, quote) {
            assert.isNull(err);
            Quote.getQuotesFromDB(function(err, quotes) {
                assert.deepEqual(quotes[0], quote);
                done();
            })
        }, 0)
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request
            .get('/invalidUrl')
            .expect(404)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
    });

    it("should get html page when requesting '/'", function(done) {
        request
            .get('/')
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
    });

    it("should get html page when requesting '/index'", function(done) {
        request
            .get('/index')
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                done();
            });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request
            .get('/api/quote')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
                assert.isNull(err);
                assert.typeOf(res, 'object');
                assert.typeOf(res.body.text, 'string');
                assert.typeOf(res.body.author, 'string');
                done();
            });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        request
            .get('/api/quotes')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
                assert.isNull(err);
                assert.typeOf(res, 'object');
                assert.equal(res.body.length, 102);
                assert.typeOf(res.body[0].text, 'string');
                assert.typeOf(res.body[0].author, 'string');
                done();
            });
    });
});
