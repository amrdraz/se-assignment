var assert = require('chai').assert;
var app = require('../app.js').app;
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');
var quotes=db.db('inspire-me').collection('quotes');




before(function(done) {
    
  db.connect(function(err, db) {

    if (err)

      return done(err);

    else

      done();

  });

});

describe("getElementByIndexElseRandom", function() {

    var arr = [1, 2, 3, 43, 5];

    it("should return a random element that is included in the array if we omit the index", function() {

      var randomElement = Quote.getElementByIndexElseRandom(arr);

      assert.include(arr, randomElement, 'array contains value');

    });

    it("should return the first element if we also pass the index 0", function() {

      var element = Quote.getElementByIndexElseRandom(arr, 0);

      assert.equal(element, '1', "Returns first element ");
    
    });
    
    it("should return the last element if we also pass the index", function() {
      
      var element = Quote.getElementByIndexElseRandom(arr, arr.length-1);
      
      assert.equal(element, '5', "Returns last element ");
    
    });
});

describe("getQuotesFromJSON", function() {
    
  it("should return an array of 102 quote", function() {
    
    var arrayLength = Quote.getQuotesFromJSON().length;
      
    assert.equal(arrayLength, '102', "Correct length is 102 quotes!");
    
  });
    
  it("first quote in the array's author should be Kevin Kruse", function() {
    
    var arrayFirstAuthor = Quote.getQuotesFromJSON()[0].author;
    
    assert.equal(arrayFirstAuthor, 'Kevin Kruse', "Correct Author");
  
  });
});

describe("getQuoteFromJSON", function() {
    
  it('should return a quote object with an author and text property', function() {
    
    var randomQuote = Quote.getQuoteFromJSON();
    
    assert.property(randomQuote,'text','text is prop');
    
    assert.property(randomQuote,'author','author is prop');
    
  });
   
 it('should return a random quote if index not specified', function() {
    
    var randomQuote = Quote.getQuoteFromJSON();
    
    assert.include(Quote.quotes, randomQuote, 'array contains value');
    
  });
    
  it('should return the first quote if we pass 0', function() {
    
    var element = Quote.getQuoteFromJSON(0);
    
    assert.equal(element,Quote.quotes[0] , "Returns first element ");
  
  });
});

//quotes collection should be called quotes


describe('seed', function() {
  before(db.clearDB);

    it('should populate the db if db is empty returning true', function(done) {
        
      Quote.seed(function(err, seeded){
                    
        assert.equal(seeded,true,'seeded is true');

        done();
      
      });
                
    });
     
    it('should have populated the quotes collection with 102 document', function(done) {
        
      quotes.count(function(err,count){
        
        assert.equal(count,102,"full");
        
        done();
      
      });
       
    });


    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        
     Quote.seed(function(err, seeded){
                    
        assert.equal(seeded,false,'seeded is false');

        done();

        
      });
            
    });
    
    it('should not seed db again if db is not empty', function(done) {
        
      quotes.count(function(err,count){
            
       assert.equal(count,102,"still full");
      
       done();

      });
       
    });
});

describe('getQuotesFromDB', function() {
    
  it('should return all quote documents in the database', function(done) {
        
      Quote.getQuotesFromDB(function (err,quotes){
        
        assert.equal(quotes.length,102,"equaal");
        
        done();

      });
  
  });
});

describe('getQuoteFromDB', function() {
    
  it('should return a random quote document', function(done) {
        
    Quote.getQuoteFromDB(function (err,quote){
          
      quotes.find().toArray(function(err, quotes){
        
        assert.include(quotes,quote,"existss");
        
        done();
      
      });
        
    });
       
  });
   
 it('should return the first quote if passed 0 after callback', function(done) {
        
    Quote.getQuoteFromDB(function (err,quote){
      
      quotes.find().toArray(function(err, quotes){
      
        assert.equal(quotes[0].author,quote.author,"first");
      
        assert.equal(quotes[0].text,quote.text,"first");
      
        done();
      
      });
      
    },0);
      
  });

});

describe('API', function() {
   
  it("should return a 404 for urls that don't exist", function(done) {
    
    request(app)
      
      .get('/wrongpaths')
      
      .set('Accept', 'application/json')
      
      .expect(404)
      
      .end(function(err, res){
        
        if (err)
        
          return done(err) 
        
      });
   
     
    done();
    
  });

  it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {

    request(app)

      .get('/api/quote')

      .set('Accept', 'application/json')

      .expect('Content-Type', /json/)

      .expect(200)

      .expect(function(res){
       assert.property(res.body,'_id');
       assert.property(res.body,'text');
       assert.property(res.body,'author');
      })

      .end(function(err, res){
        
        if (err)
        
          return done(err) 
         
       
       }); 
    
    done();  
    
  });

  it('/api/quotes should return an array of JSON object when I visit', function(done) {
        
    request(app)
  
      .get('/api/quotes')
  
      .set('Accept', 'application/json')
  
      .expect('Content-Type', /json/)
  
      .expect(200)
  
      .end(function(err, res){
      
        if (err)
      
          return done(err) 
      
      });
      
    done();
  
  });

});
