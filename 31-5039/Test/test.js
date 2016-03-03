var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');


before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(err, db) {
        if (err)
        { 
        //console.log(err);
         done(err);

        }
       else
       {
        console.log("mfeesh error yabn 3amy")
        done();
       }

     });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        // TODO
        var element = Quote.getElementByIndexElseRandom(arr);
        
                function containsObject(object, list) {
                    var i;
                        var contains = false;
                    for (i = 0; i < list.length; i++) {
                        if (list[i] === object) {
                            
                            contains=true;
                           // console.log("mwgooda");
                            return contains;
                        }
                        
                    }
                      return contains;
                    }
                    assert.equal(true,containsObject(element,arr));
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
        var firstElement = Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(1,firstElement);

    });
    it("should return the last element if we also pass the index", function() {
        // TODO
        var lastElement = Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(5,lastElement);
    });
});


describe("getQuotesFromJSON", function() {
  var arr = Quote.getQuotesFromJSON();
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        
        var count = arr.length;
        console.log(count);
        assert.equal(102,count);
        
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
    var first = arr[0];
    var author = first.author;
    assert.equal("Kevin Kruse",author);

    });
});

describe("getQuoteFromJSON", function() {

        var quote = Quote.getQuoteFromJSON();

        it('should return a quote object with an author and text property', function() {
            // TODO: check that the returned quote has text and author
            
            var boolAuthor = false;
            var boolText = false;
            if(quote.hasOwnProperty('author'))
            {
            //console.log(quote.author);
            boolAuthor = true;
            }
            if(quote.hasOwnProperty('text'))
            {
            //console.log(quote.text);
            boolText = true;
            }
            assert.equal(true,boolAuthor);
            assert.equal(true,boolText);


        });
        it('should return a random quote if index not specified', function() {
           // TODO: is the returned quote in the all quotes array?
            var arr = Quote.getQuotesFromJSON();
            function containsObject(object, list) {
                var contains = false;
                    var i;
                    for (i = 0; i < list.length; i++) {
                        if (list[i] === object) {
                            
                            contains=true;
                           // console.log("mwgooda");
                            return contains;
                        }
                    }

                    return contains;
                }
            assert.equal(true,containsObject(quote,arr));

            });
        it('should return the first quote if we pass 0', function() {
            // TODO: you know the content of first quote
            var firstQuote = Quote.getQuoteFromJSON(0);
            var firstQuoteAuthor = firstQuote.author;
            assert.equal('Kevin Kruse',firstQuoteAuthor);


        });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
       Quote.seed(function(err,seeded){
            if(err) 
            {
                return done(err);
            }
            assert.equal(seeded,true);
            done();
          });
        
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        db.db().collection('quotes').count(function (err, count){
        if(err) 
            {
                return done(err);
            }
        assert.equal(count,102);
        done();
    });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err,seeded){
            if(err) 
            {
                return done(err);
            }
            assert.equal(false,seeded);
            done();
          });
        
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
         var test =db.db().get('quotes');
       test.count({}, function (error, count) {
            assert.equal(count,102);
            done();
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err, Allquotes){
        if(err) 
        {
            return done(err);
        }
       
        assert.equal(Allquotes.length,102);
        done();
        
    });
});
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
  

        
    });
});

    it('should return the first quote if passed 0 after callback', function() {
        // TODO: you know the content of object in the file
         

    });

 });
describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function() {
        // TODO: test with supertest
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function() {
        // TODO: test with supertest
    });

    it('/api/quotes should return an array of JSON object when I visit', function() {
        // TODO: test with supertest
    });
});
