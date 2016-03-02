var assert = require('chai').assert;
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
        assert.include(arr,Quote.getElementByIndexElseRandom(arr),'Element included in the list');
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(arr[0],Quote.getElementByIndexElseRandom(arr,0),'Element included in the list');
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,arr.length-1),arr[4],'Element included in the list');
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
       assert.lengthOf(Quote.getQuotesFromJSON(),102,'Quotes has a length of 102 quotes');
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(Quote.getQuotesFromJSON()[0].author,'Kevin Kruse','First element in array is written by Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert.property(Quote.getQuoteFromJSON(),'author','object has an author');
        assert.property(Quote.getQuoteFromJSON(),'text','object has a text');
    });
    it('should return a random quote if index not specified', function() {
       assert.include(Quote.getQuotesFromJSON(),Quote.getQuoteFromJSON(),'Element included in the list');
    });
    it('should return the first quote if we pass 0', function() {
        assert.equal(Quote.getQuotesFromJSON()[0],Quote.getQuoteFromJSON(0),'First element in List is returned');
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(error, seeded){
            assert.equal(seeded,true,'DB has seeded the items');
            done();    
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.seed(function(error, seeded){
            Quote.getQuotesFromDB(function(err,items){
                assert.lengthOf(items,102,'DB has 102 items');
                done();
            });    
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(error, seeded){
                Quote.seed(function(error, seeded){
                assert.equal(seeded,false,'DB has already seeded the quotes once');
                done();    
            });    
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        Quote.seed(function(error, seeded){
                Quote.seed(function(error, seeded){
                    Quote.getQuotesFromDB(function(err,items){
                    assert.lengthOf(items,102,'DB has 102 items');
                    done();
                });     
            });    
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err,items){
            assert.lengthOf(items,102,'Elements in DB has a length of 102 quotes');
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuotesFromDB(function(err,items){
            Quote.getQuoteFromDB(function(err,item){
                assert.include(items,item,'Element included in the DB');
                done();
            });
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuotesFromDB(function(err,items){
            Quote.getQuoteFromDB(function(err,item){
                assert.equal(items[0].author,item.author,'First element in DB has same author');
                assert.equal(items[0].text,item.text,'First element in DB is has same text');
                done();
            },0);
        });
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/a').expect(404,done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request.get('/api/quote').set('Accept','application/json').expect('Content-Type',/json/).expect(function(res){
            assert.property(res.body,'_id','object has an id');
            assert.property(res.body,'text','object has a text');
            assert.property(res.body,'author','object has an author');
            // assert.isString(res.body.author);
        }).expect(200,done);
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        request.get('/api/quotes').set('Accept','application/json').expect('Content-Type',/json/).expect(function(res){
            assert.isArray(res.body,'Quotes should be an array');
        }).expect(200,done);
    });
});