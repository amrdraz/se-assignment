// tests/quotes.js

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

var exists = function(array, element){
    for(var i = 0; i<array.length; i++){
        if(array[i] == element)
            return true;
    }
    return false;
}

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var x = Quote.getElementByIndexElseRandom(arr);
        assert.equal(exists(arr, x), true);
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(arr[0], Quote.getElementByIndexElseRandom(arr, 0));
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(arr[(arr.length)-1], Quote.getElementByIndexElseRandom(arr, (arr.length)-1));
    });
});

describe("getQuotesFromJSON", function() {
    var x = Quote.getQuotesFromJSON();
    it("should return an array of 102 quote", function() {
        assert.equal(x.length, 102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(x[0].author, "Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    
    it('should return a quote object with an author and text property', function() {
        var x = Quote.getQuoteFromJSON();
        assert.equal((x.author != null && x.text != null), true);
    });
    it('should return a random quote if index not specified', function() {
       var x = Quote.getQuoteFromJSON();
       var y = Quote.getQuotesFromJSON();
       assert.include(y,x);
    });
    it('should return the first quote if we pass 0', function() {
        var x = Quote.getQuoteFromJSON(0);
        var y = Quote.getQuotesFromJSON();
        assert.equal(x,y[0]);
    }); 
});

describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err, x){
            assert(x, err);
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.getQuotesFromDB(function(err, x){
            assert.equal(x.length, 102);
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err, x){
            assert(!x,"Records already exist");
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        Quote.getQuotesFromDB(function(err, x){
            assert.equal(x.length == 102, true);
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, x){
            assert.equal(x.length, 102);
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(err, x){
            var y = Quote.getQuotesFromDB(function(err, y){
                assert.include(y, x);
                done();
            });
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function(err, x){
            var y = Quote.getQuotesFromDB(function(err, y){
                assert.equal(y[0].author == x.author && y[0].text == x.text, true);
                done();
            });
        },0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/nothing').set('Accept', 'application/json').expect(404).end(function(err, res){
            if (err) return done(err);
            done();
        });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request.get("/api/quote").set("Accept", "application/json").expect(200).end(function(er,seeded){
            expect(seeded.body).to.have.property("author");
            expect(seeded.body).to.have.property("text");
            expect(seeded.body).to.have.property("_id");
        });
        done();
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
            done();
    });
    
    it('', function(done) {
        request.get("/api/quotes").set("Accept", "application/json").expect(200).end(function(err,seeded){
            assert.equal(102,seeded.length);
        });
        done();
    });
});