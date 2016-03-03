var assert = require('chai').assert;
var app = require('../app.js');
var request = require("supertest");
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
        var rand = Quote.getElementByIndexElseRandom(arr);
        assert.include(arr, rand, "");
    });
    it("should return the first element if we also pass the index 0", function() {
       var element = Quote.getElementByIndexElseRandom(arr,0);
       assert.equal(element, 1);
    });
    it("should return the last element if we also pass the index", function() {
        var element = Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(element, 5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var array = Quote.getQuotesFromJSON();
        assert.isArray(array, "");
        assert.lengthOf(array, 102, "");
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var array = Quote.getQuotesFromJSON();
        var author = array[0].author;
        assert.equal(author, "Kevin Kruse");

    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var element =Quote.getQuoteFromJSON();
        assert.isNotNull(element.author, "");
        assert.isNotNull(element.text, "");

    });
    it('should return a random quote if index not specified', function() {
       var array= Quote.getQuotesFromJSON();
       var element= Quote.getQuoteFromJSON();
        assert.include(array, element, "");

    });
    it('should return the first quote if we pass 0', function() {
       var array= Quote.getQuotesFromJSON();
       var element= Quote.getQuoteFromJSON(0);
       assert.deepEqual(element, array[0], "");
    });
});

describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function (err, seeded){
            assert.isTrue(seeded,"");
            
        });
        done();
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.seed(function (err, seeded){
            Quote.getQuotesFromDB(function(err, quotes){
                assert.lengthOf(quotes, 102, "");
            });
        });
        done();
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function (err, seeded){
            assert.isTrue(seeded,"");
        });
        Quote.seed(function (err, seeded){
            assert.isNotTrue(seeded,"");
        });
        done();
    });
    it('should not seed db again if db is not empty', function(done) {
        Quote.seed(function (err, seeded){
            Quote.getQuotesFromDB(function(err, quotes){
                assert.lengthOf(quotes, 102, "");
            });
        });
        Quote.seed(function (err, seeded){
            assert.isNotTrue(seeded,"");
            Quote.getQuotesFromDB(function(err, quotes){
                assert.lengthOf(quotes, 102, "");
            });
        });
        done();
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, quotes){
            if(err){
                assert.isNull(quotes);
            }
            else{
                assert.isNull(err);
                assert.lengthOf(quotes, 102, "");
            }
        });
        done();
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(err, quote){
            assert.isNull(err);
            var array= Quote.getQuotesFromJSON();
            assert.include(array, quote, "");
        });
        done();
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function(err, quote){
            assert.isNull(err);
            assert.equal(quote.author, "Kevin Kruse", "");
            assert.equal(quote.text, "Life isn’t about getting and having, it’s about giving and being", "");
        }, 0);
        done();
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/api/quotation').expect(404,done);
    });

 //    it('/api/quotes should return an array of JSON object when I visit', function(done) {
 //        request.get('/api/quotes').set('Accept', 'application/json').expect(200).end(function(err,result){
 // //         result.should.have.property('text')
 //            done();
 //        });
 //    });

    // it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
    //     request.get('/api/quote').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
    // });
});