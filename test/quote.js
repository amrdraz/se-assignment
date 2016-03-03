
var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');
var quotes = require('../quotes.json');

before(function (done) {
    // use this after you have completed the connect function
     db.connect(function (err, db) {
     if (err) return done(err);
     else done();
     });
});


describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var i = Quote.getElementByIndexElseRandom(arr);
        var inArray = false;
        for(var j = 0; j < arr.length; j++)
        {
            if(arr[j] == i)
            {
                inArray = true;
                break;
            }
        }
        assert.equal(inArray,true);    
    });
    it("should return the first element if we also pass the index 0", function() {
        var i = Quote.getElementByIndexElseRandom(arr, 0);
        var inArray = false;
        if(i == arr[0])
            inArray = true;
        assert.equal(inArray,true); 
    });
    it("should return the last element if we also pass the index", function() {
        var i = Quote.getElementByIndexElseRandom(arr, arr.length - 1);
        var inArray = false;
        if(i == arr[arr.length - 1])
            inArray = true;
        assert.equal(inArray,true); 
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var array = Quote.getQuotesFromJSON();
        var lengthCheck = false;

        if(array.length == 102)
            lengthCheck = true;
        assert.equal(lengthCheck,true);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var array = Quote.getQuotesFromJSON();
        var firstQuote = array[0];
        var quoteCheck = false;

        if(firstQuote.author == "Kevin Kruse")
            quoteCheck = true;
        assert.equal(quoteCheck,true);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var returnedQuote = Quote.getQuoteFromJSON();
        var quoteCheck = true;
        assert.property(returnedQuote, 'author');
        assert.property(returnedQuote, 'text');

    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
        var returnedQuote = Quote.getQuoteFromJSON();
        var allQuotes = Quote.getQuotesFromJSON();
        var quoteCheck = false;

        for(var i = 0; i < allQuotes.length; i++)
        {
            if(allQuotes[i] === returnedQuote)
            {
                quoteCheck = true;
                break;
            }
        }
        assert.equal(quoteCheck,true);
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var returnedQuote = Quote.getQuoteFromJSON(0);
        var allQuotes = Quote.getQuotesFromJSON();
        var quoteCheck = false;

        if(returnedQuote == allQuotes[0])
            quoteCheck = true;
        assert.equal(quoteCheck,true);
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err, res)
        {
            if(err) throw err;
            else
            {
                assert.equal(res,true);
                done();
            }
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        db.db().collection("inspire-me").count(function(err, res)
        {
            if(res == 102)
                assert.equal(true,true);
            else
                assert.equal(false,true);
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err, res)
        {
            if(err) throw err;
            else
            {
                assert.equal(!res,true);
                done();
            }
        });


    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        var check = true;
        Quote.seed(function(err, res)
        {
            if(err) throw err;
            else
            {
                db.db().collection("inspire-me").count(function(err, count)
                {
                    if(res == false && count == 102)
                        assert.equal(true, true);
                    else
                        assert.equal(false, true);
                    done();
                });
            }
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        var lengthCheck = false;
        Quote.getQuotesFromDB(function(err, res){
        if(res.length == 102)
            lengthCheck = true;
        assert.equal(lengthCheck,true);
        done();
     });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns one of the quotes from all quotes
        var returnedQuote = Quote.getQuoteFromDB(function(err,res)
        {
            var quoteCheck = false;
            for(var i = 0; i < quotes.length; i++)
            {
                if(res.author == quotes[i].author && res.text == quotes[i].text)
                    quoteCheck = true;
            }
            assert.equal(quoteCheck, true);
            done();
        });
        
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file    
        Quote.getQuoteFromDB(function(err,res)
        {
            var quoteCheck = false;
            if(res.author == db.db().collection("inspire-me").find().toArray()[0].author 
                && res.text == db.db().collection("inspire-me").find(0).toArray()[0].text)
                quoteCheck = true;
            assert.equal(quoteCheck,true);
            done(); 
        },0);

    });
});

describe('API', function() {
    request = request(app.app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/sfdsdf')
        .expect(404, done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get('/api/quote')
        .expect(200)
        .end(function(err, res){
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