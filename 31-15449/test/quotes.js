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
        var index = arr.indexOf(Quote.getElementByIndexElseRandom(arr));
        assert.notEqual(index, -1);
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr, 0), 1);
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr, 4), 5);
    });
});

describe("getQuotesFromJSON", function() {
    var quotes = Quote.getQuotesFromJSON();
    it("should return an array of 102 quote", function() {
        assert.equal(quotes.length, 102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(quotes[0].author, 'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    var quote = Quote.getQuoteFromJSON();
    var allQuotes = Quote.getQuotesFromJSON();
    it('should return a quote object with an author and text property', function() {
        assert(quote.author, "'author' property is not defined");
        assert(quote.text, "'text' property is not defined");
    });
    it('should return a random quote if index not specified', function() {
        var found = false;
        for(var i = 0; !found && i < allQuotes.length; ++i)
            if(quote.author === allQuotes[i].author && quote.text === allQuotes[i].text)
                found = true;
        assert.isOk(found, "The returned quote is not in quotes.json");
    });
    it('should return the first quote if we pass 0', function() {
        quote = Quote.getQuoteFromJSON(0);
        assert.equal(quote.author, "Kevin Kruse");
        assert.equal(quote.text, "Life isn’t about getting and having, it’s about giving and being");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);

    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err, seeded){
            assert.isOk(seeded);
            done(err);
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        db.db().get('quotes').find({}, function (err, docs){

            assert.equal(docs.length,  102);
            done(err);
        });
    });

    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err, seeded){
            assert.isNotOk(seeded);
            done(err);
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        Quote.seed(function(err, seeded){
                db.db().get('quotes').find({}, function (err, docs){
                    assert.equal(docs.length,  102);
                    done(err);
            });
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quotes documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, docs){
            assert.equal(docs.length, 102);
            done(err);
        });
    });
});

describe('getQuoteFromDB', function() {

    var allQuotes = Quote.getQuotesFromJSON();
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(err, quote){
            var found = false;
            for(var i = 0; !found && i < allQuotes.length; ++i)
                if(allQuotes[i].author === quote.author && allQuotes[i].text === quote.text)
                    found = true;
            assert.isOk(found);
            done(err);
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function(err, quote){
            assert.equal(quote.author, "Kevin Kruse", "Author mismatch");
            assert.equal(quote.text, "Life isn’t about getting and having, it’s about giving and being", "text mismatch");
            done(err);
        }, 0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/notValidUrl').expect(404, done);
    });

    it("should return a 200 for the root page", function(done) {
        request.get('/').expect(200, done);
    });

    it("should return a 200 for the root page with /index", function(done) {
        request.get('/index').expect(200, done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request.get('/api/quote').expect('Content-Type', /json/)
        .expect(function(res){
            if(!('_id' in res.body && 'text' in res.body && 'author' in res.body))
                throw new Error("Missing keys");
        }).expect(200, done);

    });

    it('/api/quotes should return an array of JSON objects when I visit', function(done) {
        request.get('/api/quotes').expect('Content-Type', /json/)
        .expect(function(res){
            if(!Array.isArray(res.body))
                throw new Error("Returned object is not an array");
            for(var i = 0; i < res.body.length; ++i)
                if(typeof res.body[i] !== 'object')
                    throw new Error("Some contents of the array are not JSON objects");
        })
        .expect(200, done);
    });
});
