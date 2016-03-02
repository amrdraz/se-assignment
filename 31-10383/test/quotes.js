var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    db.connect(function(err, db) {
        done();
     });
});

function has(arr,x){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==x)
            return true;
    }
    return false;
}

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var x = Quote.getElementByIndexElseRandom(arr);
        assert.equal(has(arr,x),true);
    });
    it("should return the first element if we also pass the index 0", function() {
        var x = Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(x,arr[0]);
    });
    it("should return the last element if we also pass the index", function() {
        var x = Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(x,arr[4]);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var x = Quote.getQuotesFromJSON();
        assert.equal(x.length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var x = Quote.getQuotesFromJSON();
        assert.equal(x[0].author,'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var x = Quote.getQuoteFromJSON();
        assert.equal(((x.author!==undefined) && (x.text!==undefined)),true);
    });
    it('should return a random quote if index not specified', function() {
        var x = Quote.getQuoteFromJSON();
        assert.equal(has(Quote.getQuotesFromJSON(),x),true);
    });
    it('should return the first quote if we pass 0', function() {
        var x = Quote.getQuoteFromJSON(0);
        assert.equal(Quote.getQuotesFromJSON()[0],x);
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(er, qu){
            assert(qu, "Error in database");
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.getQuotesFromDB(function(er, qu){
            assert(qu.length == 102, "wrong length!!");
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(er, qu){
            assert(!qu, "Data already exists");
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        Quote.getQuotesFromDB(function(er, qu){
            assert(qu.length == 102, "Error length greater than 102");
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(er, qu){
            assert(qu.length === 102, "not the same number");
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(er,qu){
            if(er){
                assert(false);
            }else{
                Quote.getQuotesFromDB(function(er,qus){
                    if(er){
                        assert(false);
                    }else{
                        assert.include(qus, qu);
                        done();
                    }
                });
            }
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuotesFromDB(function(er, qus){
            Quote.getQuoteFromDB(function(er, qu){
                assert(qu.author == qus[0].author && qu.text == qus[0].text,"error");
                done();
            },0);
        });
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        //request.get('nothing').expect(404).end(done());
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
        request.get("/api/quotes").set("Accept", "application/json").expect(200).end(function(err,seeded){
            expect(seeded.body).to.be.a('array');
        });
        done();
    });
    //added by me
    it('', function(done) {
        request.get("/api/quotes").set("Accept", "application/json").expect(200).end(function(err,seeded){
            assert.equal(102,seeded.length);
        });
        done();
    });
});