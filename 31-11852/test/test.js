var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(db) {
    done(); 
});
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
         var element = Quote.getElementByIndexElseRandom(arr); 
         assert(arr.indexOf(element)> -1, "Element is in not the array"); 
    });
    it("should return the first element if we also pass the index 0", function() {
        var element = Quote.getElementByIndexElseRandom(arr,0); 
        assert(arr[0]==element, "Expected: " + arr[0] + "Found: "+ element+ " ");
    });
    it("should return the last element if we also pass the index", function() {
        var element = Quote.getElementByIndexElseRandom(arr, arr.length-1); 
        assert(arr[arr.length-1]==element, "Expected: "+ arr[arr.length-1]+ "Found: "+ element+ " ");
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
         var allquotes = Quote.getQuotesFromJSON();
         assert(allquotes.length==103,"Expected: 102  Found: "+allquotes.length);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var allquotes = Quote.getQuotesFromJSON(); 
        assert(allquotes[0].author=="Kurt Cobain", "Expected: Kurt Cobain  Found: "+allquotes[0].author);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
       var aquote = Quote.getQuoteFromJSON(); 
       assert.property(aquote,'text');
       assert.property(aquote,'author'); 
       assert.isObject(aquote,'is an object');
    });
    it('should return a random quote if index not specified', function() {
       var quotes = Quote.getQuotesFromJSON(); 
       var aquote = Quote.getQuoteFromJSON(); 
       var exist = false; 
      for(var i=0; i<quotes.length; i++){ 
         if(aquote.author===quotes[i].author && aquote.text==quotes[i].text) 
            exist = true;
        } 
       
      assert(exist,"The returned quotes is not in the JSON file");

           }); 

    it('should return the first quote if we pass 0', function() {
        var quotes = Quote.getQuotesFromJSON();
        var aquote = Quote.getQuoteFromJSON(0);  
        var correct = false; 
        if(quotes[0].author==aquote.author && quotes[0].text==aquote.text){
            correct = true;
        } 
        assert(correct,"The returned quote is not in index 0");

    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
       Quote.seed(function(err,seeded){  
         assert(seeded,"Database was not seeded");
         done();
       });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
       Quote.getQuotesFromDB(function(err,quotes){ 
          assert(quotes.length==103,"Expected: 103  Found: "+quotes.length); 
          done();
       });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err,seeded){ 
            assert(!seeded,"Should not seed the DB again");
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
       Quote.getQuotesFromDB(function(err,quotes){ 
         assert(quotes.length==103,"should not seed again number of quotes should be 103 but was found"+quotes.length); 
         done();
       });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err,quotes) {  
            assert(quotes.length==103,"Expected: 103  Found:"+quotes.length);
         done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuotesFromDB(function(err,quotes){
            Quote.getQuoteFromDB(function(err1,quote){
                var exists = false;
                for(var i = 0; i < quotes.length; i++){
                    if(quotes[i].author == quote.author && quotes[i].text == quote.text){
                        exists=true;
                        break;
                    }
                }
                assert(exists, "The quote returned is not in the database");
               done();
            });
        });

    });
    it('should return the first quote if passed 0 after callback', function(done) { 
        Quote.getQuotesFromDB(function(err, quotes){
            Quote.getQuoteFromDB(function(err1, quote){
                assert(quote.author == quotes[0].author && quote.text == quotes[0].text,"Expected: first one in DB  Found:  "+quote.text+" "+ quote.author); 
            done();
            } , 0);
        });
       
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/invalid_page').expect(404,done);

    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
       request.get('/api/quote')
        .expect('Content-Type', /json/)
        .end(function(err, res){
            var quote = res.body;
             assert.property(quote, '_id');
            assert.property(quote, 'author');
            assert.property(quote, 'text');
            assert.isObject(quote, 'body is an object');
           
            done();
        });
    }); 

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest

        request.get('/api/quotes')
        .end(function(err, res){
            var quotes = res.body;
            assert.isArray(quotes, 'Returned body is not an array');
            var quote = quotes[0];
            assert.property(quote, '_id');
            assert.property(quote, 'author');
            assert.property(quote, 'text');
            done();
        });
    });
});


