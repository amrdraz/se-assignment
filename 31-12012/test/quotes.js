var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    //use this after you have completed the connect function
    db.connect(function(err, db) {
        if (err) return done(err);
        else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {


        // var Element= Quote.getElementByIndexElseRandom(arr);
        //       expect(arr).to.include(Element);

        assert.include(arr, Quote.getElementByIndexElseRandom(arr));

    });
    it("should return the first element if we also pass the index 0", function() {

        assert.equal(Quote.getElementByIndexElseRandom(arr, 0), 1);
    });

    it("should return the last element if we also pass the index", function() {
        assert.equal(5, Quote.getElementByIndexElseRandom(arr, 4));
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var NumberOfQuotes = Quote.getQuotesFromJSON();
        assert.equal(NumberOfQuotes.length, 102);
        // TODO: you know how many quotes are there
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var quotes = Quote.getQuotesFromJSON();
        assert.equal(quotes[0].author, "Kevin Kruse");

    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var qou = Quote.getQuotesFromJSON2();
        qou.should.have.property('text');
        qou.should.have.property('author');

        // TODO: check that the returned quote has text and author
    });
    it('should return a random quote if index not specified', function() {
        // TODO: is the returned quote in the all quotes array?

        var array = Quote.getQuotesFromJSON();
        var element = Quote.getQuotesFromJSON2();
        expect(array).to.include(element);

    });


    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote

        var quote = Quote.getQuotesFromJSON2(0);
        var text = quote.text;
        text.should.equal("Life isn’t about getting and having, it’s about giving and being");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(error, seeded) {
            assert.equal(seeded, true);
            done();

        })

        it('should have populated the quotes collection with 102 document', function(done) {
            // TODO: check that the database contains 102 document
            Quote.getQuotesFromDB(function(err, quotes) {
                assert.equal(quotes.length, 102);
                done();
            });
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err, seeded) {
            assert.equal(seeded, false);
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still

        Quote.getQuotesFromDB(function(err, quotes) {
            assert.equal(quotes.length, 102);
            done();
        });
    })
});



describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err, quotes) {
            //quotes.should.equal(102);
            assert.equal(quotes.length, 102);
            done();

        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns one of the quotes from all quotes
        Quote.getQuotesFromDB(function(err, quotes) {
            Quote.getQuoteFromDB(function(err, OneQuote) {
                expect(quotes).to.include(OneQuote);
                done();
            });
        });
    });

    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB(function(err, result) {
            assert.equal(result.author, 'Kevin Kruse');
            assert.equal(result.text, 'Life isn’t about getting and having, it’s about giving and being');
            done();


        }, 0)
    });
});



describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/error').expect(404).end(function(err, res) {

            if (err)
                return done(err);
        });
        done();
    })

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {

        request.get('/api/quote').expect(200).end(function(err, res) {

            console.log(res.body);
            console.log(done);
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("author");
            expect(res.body).to.have.property("text");
            done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {


        request.get('/api/quotes').expect(200).end(function(err, result) {

            // request.get("/api/quotes").end(function(err,res){
            expect(result.body).to.be.an('array');
            done();
        });

    });
});