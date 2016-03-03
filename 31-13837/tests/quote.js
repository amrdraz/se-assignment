var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var database = require('../db.js');


before(function(done) {
     database.connect(function(err, db) {
        if (err) return done(err);
        else done();
     });
});


describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var item=Quote.getElementByIndexElseRandom(arr);
        assert.include(arr,item);
    });
    it("should return the first element if we also pass the index 0", function() {
        item=Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(item,arr[0]);
    });
    it("should return the last element if we also pass the index", function() {
      item=Quote.getElementByIndexElseRandom(arr,arr.length-1);
      assert.equal(item,arr[arr.length-1]);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var array=Quote.getQuotesFromJSON();
        assert.equal(array.length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
         var array=Quote.getQuotesFromJSON();

         assert.equal(array[0].author,"Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var quote=Quote.getQuoteFromJSON();
         assert.equal(quote.author==undefined || quote.text==undefined,false);
    });
    it('should return a random quote if index not specified', function() {
       var quote=Quote.getQuoteFromJSON();
       assert.include(Quote.getQuotesFromJSON(),quote);
    });
    it('should return the first quote if we pass 0', function() {
        var quote=Quote.getQuoteFromJSON(0);
        assert.equal(quote,Quote.getQuotesFromJSON()[0]);
    });
});


// quotes collection should be called quotes
describe('seed', function() {
    it('should populate the db if db is empty returning true', function(done) {
      database.clearDB(function(){
        Quote.seed(function(err,seeded){
          console.log(err+ "is error")
          assert.equal(seeded,true);
          done();
        });
    });
      });
    it('should have populated the quotes collection with 102 document', function(done) {
        var array = Quote.getQuotesFromDB(function(err,quotes){
          assert.equal(quotes.length,102);
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
     Quote.getQuotesFromDB(function(err,quotes){
        assert.equal(quotes.length,102);
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
        Quote.getQuotesFromDB(function(err,quotes){
          assert.include(quotes,quote);
          done();
        })
      });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
      Quote.getQuoteFromDB(function(err,quote){
         Quote.getQuotesFromDB(function(err,quotes){
           assert.deepEqual(quote,quotes[0]);
           done();
         });
      },0);
    });
});

describe('API', function() {

    it("should return a 404 for urls that don't exist", function(done) {
      request(app)
      .get('/tz')
      .expect(404)
      .end(function(err, res){
        if(err) throw err;
        done();
      });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request(app)
        .get('/api/quote')
        .expect(200)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err,res){
          assert.isDefined(res.body._id);
          assert.isDefined(res.body.text);
          assert.isDefined(res.body.author);
          done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
      request(app)
      .get('/api/quotes')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err,res){
        assert.isDefined(res.body);
        assert.equal(res.body.length,102);
        done();
      });
    });

});
