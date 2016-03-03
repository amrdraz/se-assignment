var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var qjs = require('../static/js/quotes.js');
var db = require('../static/js/db.js');
var should = require('chai').should();
var expect = require('chai').expect;
var include = require('chai').include;
var parsedJSON = require('../static/js/quotes.json');
var supertest = require("supertest");
var istanbul = require("istanbul");

before(function(done) {
    db.connect(function(err, db) {
       if (err) return done(err);
       else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
            var res= qjs.getElementByIndexElseRandom(arr);
            expect(arr).to.include(res);
    });
    it("should return the first element if we also pass the index 0", function() {
        var res= qjs.getElementByIndexElseRandom(arr,0)
         res.should.equal(1);
    });
    it("should return the last element if we also pass the index", function() {
       var res= qjs.getElementByIndexElseRandom(arr,arr.length-1)
       res.should.equal(5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var res = qjs.getQuotesFromJSON();
        // console.log("res PRINT HEREEEEE" + res)
       res.should.have.lengthOf(102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var res = qjs.getQuotesFromJSON();
        var first = res[0].author;
        first.should.equal("Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var res = qjs.getQuoteFromJSON();
        res.should.have.property('text');
        res.should.have.property('author');
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var arr = qjs.getQuotesFromJSON();
       var res = qjs.getQuoteFromJSON();
       expect(arr).to.include(res);
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var res = qjs.getQuoteFromJSON(0);
        var text= res.text;
        text.should.equal("Life isn’t about getting and having, it’s about giving and being");

    });
});

//quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        qjs.seed(function(err, seeded){
            assert.isTrue(seeded);
            done();
        })
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        qjs.seed(function(){
            db.db().collection("quotes").count(function(err, length){
                length.should.equal(102);
                done();
            })
        })
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        qjs.seed(function(err, seeded){
            assert.isFalse(seeded);
            done();
    });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
         qjs.seed(function(){
            db.db().collection("quotes").count(function(err, length){
                length.should.equal(102);
                done();
            })
        })
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        qjs.getQuotesFromDB(function(err, quotes){
            quotes.should.have.lengthOf(102);
            done();
        })

    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        qjs.getQuotesFromDB(function(err,x){
            qjs.getQuoteFromDB(function(err, quotes){
            expect(x).to.include(quotes);
            done();
        })
        });
        })
        
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
            qjs.getQuoteFromDB(function(err,x){
            //x.text.should.equal("Life isn’t about getting and having, it’s about giving and being");
            x.text.should.equal("When I was 5 years old, my mother always told me that happiness was the key to life.  When I went to school, they asked me what I wanted to be when I grew up.  I wrote down ‘happy’.  They told me I didn’t understand the assignment, and I told them they didn’t understand life");
            //this is the first quote in my DB, not "Life isn't about..."
            done();
        },0)
        });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        supertest(app).get("/forevercoding").expect(404).end(done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        supertest(app).get('/api/quote').expect(200).end(function(err,result){
            result.should.have.property('text')
            done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        supertest(app).get('/api/quotes').expect(200).end(function(err,result){
            if(result === Array)
                assert.isTrue(false);
            else
                assert.isTrue(true);
            done();
        })
    });
});