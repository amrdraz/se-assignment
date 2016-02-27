
var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');
var jsonFile = require('../../quotes.json');

before(function(done) {
    db.connect(function(err, db) {
       if (err) return done(err);
       else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function()
    {
        assert(Quote.getElementByIndexElseRandom(arr)!=-1)
    });

    it("should return the first element if we also pass the index 0", function()
    {
        assert.equal(1,Quote.getElementByIndexElseRandom(arr,0));
    });

    it("should return the last element if we also pass the index", function() 
    {
        assert.equal(5,Quote.getElementByIndexElseRandom(arr,4));
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of "+jsonFile.length+" quotes", function() 
    {
        assert.equal(jsonFile.length,Quote.getQuotesFromJSON().length);
    });

    it("first quote in the array's author should be "+jsonFile[0].author, function() 
    {
        assert.equal(jsonFile[0].author,Quote.getQuoteFromJSON(0).author);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() 
    {
        assert.property(Quote.getQuoteFromJSON(), "author");
        assert.property(Quote.getQuoteFromJSON(), "text");
    });
    it('should return a random quote if index not specified', function() 
    {
       var allQuotes=Quote.getQuotesFromJSON();
       assert(allQuotes.indexOf(Quote.getQuoteFromJSON())!=-1);
    });
    it('should return the first quote if we pass 0', function() 
    {
        assert.equal(jsonFile[0].author,Quote.getQuoteFromJSON(0).author);
        assert.equal(jsonFile[0].text,Quote.getQuoteFromJSON(0).text);
    });
});

describe('seed', function() 
{
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) 
    {
        Quote.seed(function(err,seeded)
        {
            if(err)
            {
                assert(false);
            }
            else
            {
                done();
            }
        });
    });
    it('should have populated the quotes collection with '+jsonFile.length+' document', function(done) 
    {
       db.db().collection("quoteApp").count(function(err, count)
       {
            if(err||count!=jsonFile.length)
            {
                assert(false);
            }
            else
            {
                done();
            }
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err,seeded)
        {
            if(err)
            {
                assert(false);
            }
            else
            {
                if(!seeded)
                {
                    done();
                }
            }
        });
    });
    it('should not seed db again if db is not empty', function(done) 
    {
        db.db().collection("quoteApp").count(function(err, count)
        {
            if(err||count!=jsonFile.length)
            {
                assert(false);
            }
            else
            {
                done();
            }
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) 
    {
        Quote.getQuotesFromDB(function(err,quotes)
            {
                if(err)
                {
                    assert(false);
                }
                else
                {
                    if(quotes.length===jsonFile.length)
                    {
                        done();
                    }
                }
            });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) 
    {
        Quote.getQuoteFromDB(function(err,elQuote)
        {
            if(err)
            {
                assert(false);
            }
            else
            {
                Quote.getQuotesFromDB(function(err,elQuotes)
                {
                    if(err)
                    {
                        assert(false);
                    }
                    else
                    {
                        assert.include(elQuotes, elQuote);
                        done();
                    }
                });
            }
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) 
    {
        var quotesArray;
        Quote.getQuotesFromDB(function(err,quotes)
        {
            quotesArray=quotes;
        });
        Quote.getQuoteFromDB(function(err,elQuote)
        {
            if(err)
            {
                assert(false);
            }
            else
            {
                assert.equal(quotesArray[0].author,elQuote.author);
                assert.equal(quotesArray[0].text,elQuote.text);
                done();
            }
        },0);   
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) 
    {
        request.get('balabizo').expect(404).end(done());
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) 
    {
        request.get("/api/quote").expect(200).expect("Content-Type", /json/).end(function(err,res)
        {
            assert.property(res.body, "author");
            assert.property(res.body, "text");
            assert.property(res.body, "_id");
            done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) 
    {
        request.get("/api/quotes").expect(200).expect("Content-Type", /json/).end(done());     
    });
});
