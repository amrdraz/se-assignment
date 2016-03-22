var assert = require('chai').assert; 
var app = require('../lib/app.js');
var request = require('supertest');
var Quote =    require('../lib/quotes.js');
var db = require('../lib/db.js');

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
       //function getElementByIndexElseRandom(arr , null);
      Quote.getElementByIndexElseRandom(arr,null);
      
  

        // TODO
    });
    it("should return the first element if we also pass the index 0", function() {
        var t=Quote.getElementByIndexElseRandom(arr,0);
        //function getElementByIndexElseRandom(arr , 0);
 expect(t).to.equal(1);
        // TODO
    });
    it("should return the last element if we also pass the index", function() {
       var t= Quote.getElementByIndexElseRandom(arr,arr.length-1);
 expect(t).to.equal(5);
        //function getElementByIndexElseRandom(arr , arr.length-1);
        // TODO
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        var r=Quote.getQuotesFromJSON(cb);
         expect(r.length).to.equal(102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var r=Quote.getQuotesFromJSON(cb);
         expect(r.length).to.equal("author": "Kevin Kruse",
    "text": "Life isn’t about getting and having, it’s about giving and being");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
      var t=  Quote.getQuoteFromJSON(cb,index);

    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var t=  Quote.getQuoteFromJSON(cb,null);
    });
    it('should return the first quote if we pass 0', function() {
       var t=  Quote.getQuoteFromJSON(cb,0);
       expect(t).to.equal("author": "Kevin Kruse",
    "text": "Life isn’t about getting and having, it’s about giving and being");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        var db1=db.db();
        if (db1.length==0)
            var t=true;
        assert.equal(t,'true');
        // TODO: assert that seeded is true
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
    

        assert.equal(db.db().length,102);
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        assert.equal('false','false');
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        assert.equal(db.db().length,102);
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        var t=Quote.getQuotesFromDB(cb);
        assert.equal(t.length,102);

    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        ar t=  Quote.getQuoteFromDB(cb,0);
       expect(t).to.equal("author": "Kevin Kruse",
    "text": "Life isn’t about getting and having, it’s about giving and being");
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
       
   app .get('/api/quote')
    .expect('Content-Type', /json/)
    .expect(3000)
    .end(function (err, res) {
      done.end();
    });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
       app .get('/api/quotes')
    .expect('Content-Type', /json/)
    .expect(3000)
    .end(function (err, res) {
      done.end();
    });
    });
});
