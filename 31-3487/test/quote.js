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

before(function(done){
    db.connect(function(err ,db){
        if(err) done(err);
        else done();
    });
});
describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var x = Quote.getElementByIndexElseRandom(arr);
        var flag = arr.indexOf(x);
        assert.notEqual(flag, -1);
    });
    it("should return the first element if we also pass the index 0", function() {
        var x = Quote.getElementByIndexElseRandom(arr, 0);
        var flag = arr.indexOf(x);
        assert.equal(flag, 0);
    });
    it("should return the last element if we also pass the index", function() {
        var x = Quote.getElementByIndexElseRandom(arr, arr.length-1);
        var flag = arr.indexOf(x);
        assert.equal(flag, arr.length-1);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
       assert.lengthOf( Quote.getQuotesFromJSON(), 102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var author = Quote.getQuoteFromJSON(0).author;
        assert.equal( author,'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var quote = Quote.getQuoteFromJSON();
        assert.property(quote, 'author');
        assert.property(quote, 'text');
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var quote = Quote.getQuoteFromJSON();
       var quotes = Quote.getQuotesFromJSON();
       assert.notEqual(quotes.indexOf(quote), -1);
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var quote = Quote.getQuoteFromJSON(0);
        var firstQuote = {
                            "author": "Kevin Kruse",
                            "text": "Life isn’t about getting and having, it’s about giving and being"
                        }
        assert.equal(quote.author, firstQuote.author)
        assert.equal(quote.text, firstQuote.text);
    
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err, seeded){
            assert.isTrue(seeded);
            done(err);
            // assert(seeded === true);
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
       Quote.seed(function(err, seeded){
            Quote.getQuotesFromDB(function(err, quotes){
            assert.lengthOf(quotes,102);
            done(err)
            });
        })
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err, seeded){
            assert.isFalse(seeded);
            done(err);
        })
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.seed(function(err, seeded){
        Quote.getQuotesFromDB(function(err, quotes){ 
            if(!err){
                assert.lengthOf(quotes,102);
                done(err);
            }
            else{
                done(err);
            }
            });
        })
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err, quotes){
            assert.lengthOf(quotes,102)
            done(err);
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuoteFromDB(function(err, quote){
            db.db().collection('quotes').find().toArray(function(err,array){
                assert(array.indexOf(quote !== -1))
                done(err);
            })
        })
    });
    it('should return the first quote if passed 0 after callback', function(done) { //not working yet
        // TODO: you know the content of object in the file
          Quote.getQuotesFromDB(function(err, quotes){
            Quote.getQuoteFromDB(function(err, quote){
                var test = Quote.getElementByIndexElseRandom(quotes,0);
                assert.equal(quote.author,test.author);
                assert.equal(quote.text, test.text);
                done(err);
            },0);
        });
    });
});

describe('API', function() {
    // request = request(app);

    it("should return a 404 for urls that don't exist", function(done) {
    request(app)
    .get('/apinowhere')
    .expect(404, done);
});

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request(app)
        .get('/api/quote')
        .expect('Content-Type',/json/)
        .expect(function(res){
            assert.property(res.body, '_id')
            assert.property(res.body, 'text')
            assert.property(res.body, 'author')     
        })
        .expect(200,done);

    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request(app)
        .get('/api/quotes')
        .expect('Content-Type', /json/)
        .expect(function(res){
            assert.isArray(res.body)
        })
        .expect(200,done);
    });
});
