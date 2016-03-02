
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
        //I did not know how to check for randomness so i tried comparing 3 trials of the function
        //but it still might fail once every couple of tries , if it is required please uncomment
        //the middle of the test
        var test = Quote.getElementByIndexElseRandom(arr);
        /*
        var test2 = Quote.getElementByIndexElseRandom(arr);
        var test3  = Quote.getElementByIndexElseRandom(arr);
        var f = test!==test2 || test!==test3 || test2!==test3;
        assert.equal(f,true);
        */
        assert.include(arr,test);
    });
    it("should return the first element if we also pass the index 0", function() {
        var test = Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(test,1);
    });
    it("should return the last element if we also pass the index", function() {
        var test = Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(5,test)
    });
});

describe("getQuotesFromJSON", function() {
        var test = Quote.getQuotesFromJSON();
    it("should return an array of 102 quote", function() {
        assert.equal(test.length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(test[0].author,"Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var test = Quote.getQuoteFromJSON();
        assert.isObject(test);
        assert.isString(test.author);
        assert.isString(test.text);
    });
    it('should return a random quote if index not specified', function() {
       var test = Quote.getQuoteFromJSON();
       var arr = Quote.getQuotesFromJSON();
       assert.include(arr,test);
    });
    it('should return the first quote if we pass 0', function() {
        var test = Quote.getQuoteFromJSON(0);
        var first = {"author": "Kevin Kruse","text": "Life isn’t about getting and having, it’s about giving and being"};
        assert.equal(first.author,test.author);
        assert.equal(first.text,test.text);
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function (err2, seeded) {
            assert.equal(seeded,true);
            done();
        });
    });

    it('should have populated the quotes collection with 102 document', function(done) {
        var test =db.db().get('quotes');
        test.count({}, function (error, count) {
            assert.equal(count,102);
            done();
        });
    });

    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function (err2, seeded) {
            assert.equal(seeded,false);
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        var test =db.db().get('quotes');
        test.count({}, function (error, count) {
            assert.equal(count,102);
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err,quotes){
            assert.equal(quotes.length,102);
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(err,quote){
            Quote.getQuotesFromDB(function(err1,quotes){
                var f = false;
                quotes.forEach(function(item){
                    f = f|| (item.text===quote.text && item.author===quote.author);
                });
                assert.equal(f,true);
                done();
            });
        });
    });

    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function(err,quote){
            Quote.getQuotesFromDB(function(err1,quotes){
                assert.equal(quotes[0].author,quote.author);
                assert.equal(quotes[0].text,quote.text);
                done();
            });
        },0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request
        .get('/api')
        .expect(404, done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request
        .get('/api/quote')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){
            assert.isString(res.body.author);
            assert.isString(res.body.text);
            assert.isString(res.body._id);
        })
        .expect(200, done);
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        request
        .get('/api/quotes')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){
            assert.isArray(res.body);
        })
        .expect(200, done);
    });
});
