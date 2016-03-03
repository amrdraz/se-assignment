var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');
var posts=require('../routes/router');

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
        var x = Quote.getElementByIndexElseRandom(arr);
        assert(arr.indexOf(x) > -1 , "Returned element is in the array");
    });
    it("should return the first element if we also pass the index 0", function() {
            
        var x = Quote.getElementByIndexElseRandom(arr,0);
        assert(arr[0]==x,"Expected:"+arr[0]+"Actual:"+x);
       
    });
    it("should return the last element if we also pass the index", function() {
       var x = Quote.getElementByIndexElseRandom(arr,4);
       assert(arr[4]==x,"Expected:"+arr[4]+"Actual:"+x);
        
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
       var x=Quote.getQuotesFromJSON();
       var size=x.length;
       assert.strictEqual(size,102, 'these values are strictly equal');
    });

    it("first quote in the array's author should be Ralph Marston", function() {
        var x=Quote.getQuotesFromJSON();
        var index=x[0];
        var author=index.author;
        assert.equal(author,"Ralph Marston", 'these values are strictly equal');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var x= Quote.getQuoteFromJSON();
         assert.property(x, 'text');
         assert.property(x,'author');
         assert.isObject(x,'is an object');
       

    });
    it('should return a random quote if index not specified', function() {
        var x=Quote.getQuoteFromJSON();

    });
    it('should return the first quote if we pass 0', function() {
        var x=Quote.getQuoteFromJSON(0);
        assert(x.text=="What you do today can improve all your tomorrows");
        assert(x.author=="Ralph Marston");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
           Quote.seed(function(err,seeded){
            
                assert.isTrue(seeded);
            
            done();
           });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        db.db().collection('quotes').find().count(function(err,length){
            assert.isNull(err);
            assert.equal(length,102);
             done();
        });

    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
       
         Quote.seed(function(err,seeded){
            
                assert.isFalse(seeded);
            
            done();
           });
    });
    it('should not seed db again if db is not empty', function(done) {
           Quote.seed(function(err,seeded){
             db.db().collection('quotes').find().count(function(err,length){
            assert.isNull(err);
            assert.equal(length,102);
            assert.isFalse(seeded);
             done();
        });
         });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {

        Quote.getQuotesFromDB(function(err,quotes){
            var size=quotes.length;
            assert.strictEqual(size,102, 'these values are strictly equal');
               done();
        });
     
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(err,quotes){
             var x=quotes;
             done();
    });
        
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function(err,x){
        var author=x.author;
        var text=x.text;
        assert.author(author=="Ralph Marston");
        assert(text=="What you do today can improve all your tomorrows");
        ;  
}, 0);
        done();
    });
});

describe('API', function() {
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request(app).get("/batee5").expect(404).end(done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        
      request(app).get("/api/quote").expect(200).end(function(err,res){
      done();
    });

    });
});
   