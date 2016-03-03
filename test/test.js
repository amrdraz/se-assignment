var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var karim = require('../quotes.js');
var db = require('../db.js');
var mocha = require('mocha');

before(function(done) {

     db.connect(function(err) {
        if (err) return done(err);
        else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        assert.include(arr,karim.getElementByIndexElseRandom(arr));
    });
    it("should return the first element if we also pass the index 0", function() {
      assert.equal(1,karim.getElementByIndexElseRandom(arr,0));


    });
    it("should return the last element if we also pass the index", function() {
          assert.equal(5,karim.getElementByIndexElseRandom(arr,4));
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
      assert.equal(102,karim.getQuotesFromJSON().length);

    });
    it("first quote in the array's author should be Kevin Kruse", function() {
      assert.equal("Kevin Kruse",karim.getQuotesFromJSON()[0].author);

    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert.typeOf(karim.getQuoteFromJSON().text,'string');
        assert.typeOf(karim.getQuoteFromJSON().author,'string');
    });
    it('should return a random quote if index not specified', function() {
       var quotes = karim.getQuotesFromJSON();
       var quote = karim.getQuoteFromJSON();
      assert.include(quotes,quote);
    });
    it('should return the first quote if we pass 0', function() {
        var text = karim.getQuoteFromJSON(0).text;
        var author = karim.getQuoteFromJSON(0).author;
        assert.equal(text,"Life isn’t about getting and having, it’s about giving and being");
        assert.equal(author,"Kevin Kruse");
    });
});

describe('seed', function() {
  before(db.clearDB);

      it('should populate the db if db is empty returning true', function(done) {
        karim.seed(function(err,flag){
          assert.equal(flag,true);
          done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
      var databaseInstance = db.db();
      var counter;
      var collection = databaseInstance.collection("quotes");
      collection.find().count(function(err,count){
        assert.equal(count,102);
        done();
      });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
      karim.seed(function(err,flag){
        assert.equal(flag,false);
        done();
      });
    });
    it('should not seed db again if db is not empty', function(done) {
      var databaseInstance = db.db();
      var counter;
      var collection = databaseInstance.collection("quotes");
      collection.find().count(function(err,count){
        assert.equal(count,102);
        done();
    });
});
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
    karim.getQuotesFromDB(function(err,quotes){
      assert.equal(quotes.length,102);
      done();
    });
});
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
      karim.getQuoteFromDB(function(err,quote){
        karim.getQuotesFromDB(function(err,quotes){
            assert.include(quotes,quote);
            done();
        });
      });
    });

    it('should return the first quote if passed 0 after callback', function(done) {
        karim.getQuoteFromDB(function(err,quote){
          assert.equal(quote.text,"Life isn’t about getting and having, it’s about giving and being");
          assert.equal(quote.author,"Kevin Kruse");
          done();
        },0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/yala').expect('404 File not Found', done).expect(404);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get('/api/quote').set('Accept', 'application/json').expect(200).end(function(err,res){
          var arr = Object.keys(res.body);
          assert.equal(((arr[0]=='_id')&&(arr[1]=='author')&&(arr[2]=='text')),true);
          done();
        })
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
          request.get('/api/quotes').set('Accept', 'application/json').expect(200).end(function(err,res){
            var obj = karim.getElementByIndexElseRandom(res.body);
            var arr = Object.keys(obj);
            assert.equal(((arr[0]=='_id')&&(arr[1]=='author')&&(arr[2]=='text')),true);
            done();


          });
    });

  });
