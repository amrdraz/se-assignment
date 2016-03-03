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

describe("getElementByIndexElseRandom", function() {
  var arr = [1, 2, 3, 43, 5];
  it("should return a random element that is included in the array if we omit the index", function() {
    // TODO
    var ranelement =  Quote.getElementByIndexElseRandom(arr);
    var index      = arr.indexOf(ranelement);
    assert.equal(index!=-1,true);

  });
  it("should return the first element if we also pass the index 0", function() {
    // TODO
    var element =  Quote.getElementByIndexElseRandom(arr,0);
    assert.equal(element,arr[0]);

  });
  it("should return the last element if we also pass the index", function() {
    // TODO
    var element = Quote.getElementByIndexElseRandom(arr,arr.length-1);
    var index    = arr.length-1;
    assert.equal(element,arr[index]);

  });
});

describe("getQuotesFromJSON", function() {
  it("should return an array of 102 quote", function() {
    // TODO: you know how many quotes are there
    var arr= Quote.getQuotesFromJSON();
    var count = arr.length;
    assert.equal(count, 102);
  });
  it("first quote in the array's author should be Kevin Kruse", function() {
    // TODO: you know the content of first quote
    var arr= Quote.getQuotesFromJSON();
    var firstQuote =  arr[0];
    assert.equal(firstQuote.author, "Kevin Kruse");

  });
});

describe("getQuoteFromJSON", function() {
  it('should return a quote object with an author and text property', function() {
    // TODO: check that the returned quote has text and author
    var quote = JSON.parse(Quote.getQuoteFromJSON());
    assert.equal(typeof quote.author == "undefined",false);
    assert.equal(typeof quote.text == "undefined",false);
  });
  it('should return a random quote if index not specified', function() {
    // TODO: is the returned quote in the all quotes array?
    var ranelement =  JSON.parse(Quote.getQuoteFromJSON());
    var quotes     =  Quote.getQuotesFromJSON();
    var flag       =  false;
    for(var i=0;i<quotes.length;i++){
      if(JSON.stringify(ranelement)==JSON.stringify(quotes[i])){
        flag=true;
      }
    }
    assert.equal(flag,true);
  });
  it('should return the first quote if we pass 0', function() {
    // TODO: you know the content of first quote
    var element =  Quote.getQuoteFromJSON(0);
    var quote   =  JSON.stringify(Quote.getQuotesFromJSON()[0]);
    assert.equal(element==quote,true);
  });
});

// quotes collection should be called quotes
describe('seed', function() {
  before(db.clearDB);
  it('should populate the db if db is empty returning true', function(done) {
    // TODO: assert that seeded is true
    Quote.seed(function(err,seeded){
      if (err) {
        return console.log(err.message);
      }
      assert.equal(seeded,true);
      done();
    });
  });
  it('should have populated the quotes collection with 102 document', function(done) {
    // TODO: check that the database contains 102 document
    Quote.getQuotesFromDB(function(err,quotes){
      if (err) {
        return console.log(err.message);
      }
      var size = quotes.length;
      assert.equal(size,102);
      done();

    });


  });
  it('should not seed db again if db is not empty returning false in the callback', function(done) {
    // TODO: assert that seeded is false
    Quote.seed(function(err,seeded){
      if (err) {
        return console.log(err.message);
      }
      assert.equal(seeded,false);
      done();
    });

  });
  it('should not seed db again if db is not empty', function(done) {
    // TODO: The database should have 102 quote still
    Quote.seed(function(err,seeded){
      Quote.getQuotesFromDB(function(err,quotes){
        if (err) {
          return console.log(err.message);
        }
        var size = quotes.length;
        assert.equal(seeded,false);
        assert.equal(size,102);
        done();

      });
    });
  });
});

describe('getQuotesFromDB', function() {
  it('should return all quote documents in the database', function(done) {
    // TODO: there should be 102 documents in the db
    Quote.getQuotesFromDB(function(err,quotes){
      if (err) {
        return console.log(err.message);
      }
      var size = quotes.length;
      assert.equal(size,102);
      done();

    });
  });
});

describe('getQuoteFromDB', function() {
  it('should return a random quote document', function(done) {
    // TODO: see if it returns on of the quotes from all quotes
    Quote.getQuoteFromDB(function(err,quote){
      if (err) {
        return console.log(err.message);
      }
      Quote.getQuotesFromDB(function(err,quotes){
        if (err) {
          return console.log(err.message);
        }
        var flag =false;
        for(var i=0;i<quotes.length;i++){
          if(JSON.stringify(quotes[i])==JSON.stringify(quote)){
            flag=true
          }
        }
        assert.equal(flag,true);
        done();

      });

    });
  });
});
it('should return the first quote if passed 0 after callback', function(done) {
  // TODO: you know the content of object in the file
  Quote.getQuoteFromDB(function(err,quote){
    if (err) {
      return console.log(err.message);
    }
    Quote.getQuotesFromDB(function(err,quotes){
      if (err) {
        return console.log(err.message);
      }
      assert.equal(JSON.stringify(quotes[0])==JSON.stringify(quote),true);
      done();
    });
  },0);
});

describe('API', function() {
  request = request(app);
  it("should return a 404 for urls that don't exist", function(done) {
    // TODO: test with supertest
    request
    .get('/reem')
    .expect(404)
    .end(function(err, res){
      if (err) throw err;
      done();
    });
  });

  it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
    // TODO: test with supertest
    request
    .get('/api/quote')
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
      res= JSON.parse(res.text);
      assert.equal(typeof res._id == "undefined",false);
      assert.equal(typeof res.author == "undefined",false);
      assert.equal(typeof res.text == "undefined",false);
      done();
    });
  });



it('/api/quotes should return an array of JSON object when I visit', function(done) {
  // TODO: test with supertest
  request
  .get('/api/quotes')
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
    res= JSON.parse(res.text);
    assert.equal(Array.isArray(res),true);
    done();
  });

});


});
