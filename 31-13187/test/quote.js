var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(err, db) {
      
      done();

    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
         assert.include(arr,Quote.getElementByIndexElseRandom(arr),"true");
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
        assert.equal(arr[0],Quote.getElementByIndexElseRandom(arr,0),"true");
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(arr[arr.length-1],Quote.getElementByIndexElseRandom(arr,arr.length-1),"true");
    });
});

describe("getQuotesFromJSON", function() {
    var array = Quote.getQuotesFromJSON();
    it("should return an array of 102 quote", function() {
        
       assert.lengthOf(array,102, 'array has length of 102');
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(array[0].author,'Kevin Kruse', 'true');
    });
});

describe("getQuoteFromJSON", function() {
        var quote = Quote.getQuoteFromJSON();
        var quote1 = Quote.getQuoteFromJSON(0);
        console.log(quote1+ "here");
    it('should return a quote object with an author and text property', function() {
      
       assert.property(quote, 'author');
       assert.property(quote, 'text');
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
        assert.include(Quote.getQuotesFromJSON(),quote,"true");
    });
    it('should return the first quote if we pass 0', function() {
        assert.equal(quote1.author,
    "Kevin Kruse",
'true');
     assert.equal(quote1.text,
    "Life isn’t about getting and having, it’s about giving and being"
,'true');
    });

});
// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err,seeded){
           assert.equal(seeded,true,'true');
           done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
       db.db().collection('data').count(function(err,count){
        assert.equal(count,102,'true');
        done();
       });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err,seeded){
           assert.equal(seeded,false,'true');
           done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
         db.db().collection('data').count(function(err,count){
        assert.equal(count,102,'true');
        done();
       });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
       Quote.getQuotesFromDB(function(err,quotes){
            assert.lengthOf(quotes,102,true);
            done();
       });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        var quotes = Quote.getQuotesFromJSON();
        Quote.getQuoteFromDB(function(err,quote){
            assert.include(quotes,quote,true);
            done();
       });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB(
          function(err,quote){
          assert.equal(quote.text,
    "Life isn’t about getting and having, it’s about giving and being"
    ,"true");
           assert.equal(quote.author,"Kevin Kruse"
       
    ,"true");
    done();
          },0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/ara')
       .expect(404,done);
    
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request
  .get('/api/quote')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res){
  // console.log(res);
    if (err) throw err;
    assert.property(res.body,'author');
    assert.property(res.body,'text');
    assert.property(res.body,'_id');
    done();
  });

    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
            request
  .get('/api/quotes')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res){
    if (err) throw err;

    assert.isArray(res.body,"true");
    done();
    });
  });
});