// tests/quotes.js

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

var contain = function(array,element){

    for(var i = 0; i < array.length; i++)
        if(array[i] == element)
            return true;
    return false;
}

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var x = Quote.getElementByIndexElseRandom(arr);
        assert.equal(contain(arr,x),true);
    });
  it("should return the first element if we also pass the index 0", function() {
        var x = Quote.getElementByIndexElseRandom(arr);
        assert.equal(contain(arr,x),true);
    });
    it("should return the last element if we also pass the index", function() {
        var x = Quote.getElementByIndexElseRandom(arr, arr.length-1);
        assert.equal(contain(arr,x),true);
    });
 });

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var x = Quote.getQuotesFromJSON();
        assert.equal(x.length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var x = Quote.getQuotesFromJSON();
        assert.equal(x[0].author,"Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var x = Quote.getQuoteFromJSON(3);
        assert.equal(x.author != null && x.text != null,true);
    });
    it('should return a random quote if index not specified', function() {
       var x = Quote.getQuoteFromJSON(null);
       assert.equal(x.author != null && x.text != null,true);
    });
    it('should return the first quote if we pass 0', function() {
       var x = Quote.getQuoteFromJSON(0);
       assert.equal(x.author == "Kevin Kruse",true);
    
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err,seeded){
            assert.equal(seeded,true);
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        var x = Quote.seed(function(err,seeded){
            var y = Quote.getQuotesFromJSON().length;
            assert.equal(y,102);
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        var x = Quote.seed(function(err,seeded){
            assert.equal(x,undefined);
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
      var x = Quote.seed(function(err,seeded){
            assert.equal(seeded,false);
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        var x = Quote.getQuotesFromDB(function(err,quotes){
            assert.equal(quotes.length,102);
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