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
        var random=Quote.getElementByIndexElseRandom(arr);
        assert(arr.indexOf(random)>-1, "Element not in the array");
        
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
        var first=Quote.getElementByIndexElseRandom(arr,0);
        assert(first==arr[0], "First element is"+arr[0]+"but got"+first);
    });
    it("should return the last element if we also pass the index", function() {
        // TODO
        var index=arr.length-1;
        var last=Quote.getElementByIndexElseRandom(arr,index);
        assert(first==arr[index], "Last element is"+arr[index]+"but got"+last);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        var allQuotes=Quote.getQuotesFromJSON();
        assert(allQuotes.length==102,"Should be 102 but is"+allQuotes.length+"");
    }
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var allQuotes=Quote.getQuotesFromJSON();
        var firstA=allQuotes[0].author;
        var firstT=allQuotes[0].text;
        assert(firstA=="Kevin Kruse" && firstT=="Life isn’t about getting and having, it’s about giving and being", "First author should be Kevin Kruse but is"+firstA+"");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var quote=Quote.getQuoteFromJSON();
        assert.isObject(quote,'Quote is an object'); //Asserts that value is an object of type ‘Object’ (as revealed by Object.prototype.toString)
        assert.deepProperty(quote,'quote.author');
        assert.deepProperty(quote,'quote.text');

    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var quote=Quote.getQuoteFromJSON();
       var inQuotes=false;
       var quotes=Quote.getQuotesFromJSON();
       var i=0;
       var size=quotes.length;
       while(i<size){
            if(quote.text == quotes[i].text && quote.author ==){ 
                inQuotes=true;
                break;
            }
            i++;
       }
       assert(inQuotes,"Quote is not in the quotes.json file");
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var quotes=Quote.getQuotesFromJSON();
        var quote=Quote.getQuoteFromJSON(0);

        assert((quote.author == "Kevin Kurse" && quote.text=="Life isn’t about getting and having, it’s about giving and being" && quotes[0].author == "Kevin Kurse" && quotes[0].text=="Life isn’t about getting and having, it’s about giving and being") || (quotes[0].author == quote.author && quotes[0].text==quotes.text), 'Quote is not the same as the first quote in Json file');

    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err,seeded)){
            assert(seeded==true,"Database already populated");
            done();
        }
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.getQuotesFromDB(function(err,quotes){
            assert(quotes.length==102, "Number of quotes should be 102, but got"+quotes.length+"");
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err,seeded){
            assert(seeded==false,"Can't seed, database is already populated");
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.getQuotesFromDB(function(err,quotes){
            assert(quotes.length==102,"Number of quotes in database should be 102 but is"+quotes.length+"");
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err,quotes){
            assert(quotes.length == 102,"Number of quotes in database should be 102 but is"+quotes.length+"");
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns one of the quotes from all quotes
        Quote.getQuotesFromDB(function(err,quotes){
            Quote.getQuoteFromDB(function(err1, quote){
                var inQuotes=false;
                var i=0;
                var size=quotes.length;
                while(i<size){
                    if(quote.text == quotes[i].text && quote.author == quotes[i].author){
                        inQuotes=true;
                        break;
                    }
                    i++;
                }
                assert(inQuotes==true,"Can't find quote in all quotes");
                done();
            });
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB(function(err,quote){
            assert(quote.author=="Kevin Kruse" && quote.text=="Life isn’t about getting and having, it’s about giving and being","")
        },0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/apinowhere')
         .expect(404)
         .end(function(err, res){
        if (err)
          return done(err) // if response is 500 or 404 & err, test case will fail
        done()
      });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get('/api/quote').expect('Content-Type',/json/).expect(200,function(err,res1){
           res.body.should.be.a('object');
           res.body.SUCCESS.should.have.property('_id');
           res.body.SUCCESS.should.have.property('text');
           res.body.SUCCESS.should.have.property('author');
        }).end(done);
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request.get('/api/quotes').expect('Content-Type',/json/).end(function(err,res){
             response.should.have.status(200);
           res.body.should.be.a('object');
           res.body.to.be.a('array');
           done();
        });
    });
});