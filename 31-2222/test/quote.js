
var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    //use this after you have completed the connect function
    db.connect(function(err, db) {
        if (err) return done(err);
        else done();
     });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var found = false;
        var stuff = Quote.getElementByIndexElseRandom(arr);
        for (var i = 0; i<arr.length; ++i) {
            if(arr[i]==stuff){
                found = true;
                break;
            }
        }

        assert.equal(found, true);
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr, 0), arr[0]);
    });
    it("should return the last element if we also pass the index", function() {

        assert.equal( Quote.getElementByIndexElseRandom(arr, arr.length-1), arr[arr.length-1]);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var haga = Quote.getQuotesFromJSON();
        assert.equal(haga.length, 102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var hagaTanya = Quote.getQuotesFromJSON();
        var a = hagaTanya[0].author;
        assert.equal(a, "Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
        var stuff = Quote.getQuotesFromJSON();
    it('should return a quote object with an author and text property', function() {
        var q = stuff[0].text;
        var a = stuff[0].author;
        var b = false;
        if(q=="Life isn’t about getting and having, it’s about giving and being" && a == "Kevin Kruse"){
            b = true;
        }
        assert.equal(b, true);
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var q = Quote.getElementByIndexElseRandom(stuff);
       b = false;
       for(var i = 0; i<stuff.length;++i){
        if(q.author==stuff[i].author && q.text == stuff[i].text){
            b = true;
            break;
        }
       }
       assert.equal(b, true);
    });
    it('should return the first quote if we pass 0', function() {
        var x = Quote.getElementByIndexElseRandom(stuff,0);
        var q = stuff[0].text;
        var a = stuff[0].author;
        b = false;
        if(q==x.text && a == x.author){
            b=true;
        }
        assert.equal(b, true);
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);

    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err, seeded){
            assert.equal(seeded, true);
            done();
        });

    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.seed(function(err, seeded){
            if(err){
                throw err;
            }
           var data = db.db();
        var bool = false;

        data.collection("inspire-me").count(function(err, count){
            if(err){
                throw err;
            }
            if(count==102){
                assert.equal(true, true);
                
            }
            else{
                assert.equal(true, false);
            }
            done();
        });
        });
       
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false

        Quote.seed(function(err, seeded){
            assert.equal(seeded, false);
            done();
        });

    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.seed(function(err, seeded){
            if(err){
                throw err;
            }
           var data = db.db();
        var bool = false;

        data.collection("inspire-me").count(function(err, count){
            if(err){
                throw err;
            }
            if(count==102){
                assert.equal(true, true);
                
            }
            else{
                assert.equal(true, false);
            }
            done();
        });
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err, quotes){
            if(quotes.length==102){
                assert.equal(true,true);
            }
            else{
                assert.equal(true,false);
            }
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    var stuff = Quote.getQuotesFromJSON();
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuoteFromDB(function(err,quote){
            for(var i =0;i<stuff.length;++i){
                if(quote.text==stuff[i].text && quote.author == stuff[i].author){
                    assert.equal(true, true);
                    done();
                }
            }
            assert.equal(false, true);
            done(); 
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
         Quote.getQuoteFromDB(function(err,quote){
           
            if(quote.text==stuff[0].text && quote.author==stuff[0].author){
               assert.equal(true,true);
               done(); 
              }
              else{
                assert.equal(false, true);
                done();
              }
        },0);
           
    });
});

describe('API', function() {
    request = request(app.app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/ayAraf')
        .expect(404, done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get('/api/quote')
        .expect(200)
        .end(function(err, res){
            if(err){
                throw err;
            }
            assert.property(res.body, '_id');
            assert.property(res.body, 'text');
            assert.property(res.body, 'author');
            done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request.get('/api/quotes')
        .expect(200)
        .end(function(err, res){
            assert.isArray(res.body);
            done();
        });
    });
});