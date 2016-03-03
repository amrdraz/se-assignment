var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
   db.connect(function(err, db) {
    
       done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
   it("should return a random element that is included in the array if we omit the index", function() {
        assert.include(arr,Quote.getElementByIndexElseRandom(arr));
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,0),1);
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,4),5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
       
       var array=Quote.getQuotesFromJSON();
       assert.equal(array.length,102)
   });
   it("first quote in the array's author should be Kevin Kruse", function() {
       var array=Quote.getQuotesFromJSON();
        assert.equal(array[0].author,'Kevin Kruse', 'true');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var singlequote=Quote.getQuoteFromJSON();
        assert.typeOf(singlequote.author,'string');
        assert.typeOf(singlequote.text,'string')
    });
    it('should return a random quote if index not specified', function() {
       var singlequote=Quote.getQuoteFromJSON();
       var array=Quote.getQuotesFromJSON();
       var exist= false;
        for (var i = 0; i < array.length; i++) {
                if ((array[i].author)==(singlequote.author)&&((array[i].text)==(singlequote.text))) {
                    exist=true;
                    break;
                }
            }
        assert.equal(exist,true);
    });
    it('should return the first quote if we pass 0', function() {
        var singlequote2 = Quote.getQuoteFromJSON(0);
         assert.equal(singlequote2.author,"Kevin Kruse");
         assert.equal(singlequote2.text,"Life isn’t about getting and having, it’s about giving and being");
    });
});
// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
     it('should populate the db if db is empty returning true', function(done) {
                Quote.seed(function(err,seeded){
                    assert.equal(seeded,true);
                    done();
            });
            });

    it('should have populated the quotes collection with 102 document', function(done) {
        
        db.db().collection('quotes').count(function(err,count){
                assert.equal(count,102);
                done(); 
        });

        
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        db.connect(function(db){
                Quote.seed(function(err,flag){
                    if(flag==false){
                        console.log("it is already seeded so it will not seed again"); 
                        test=true;
                    }
                    else{
                        console.log("it is already seeded but it seeded again which is not correct");                        test=false;
                    }
                    assert(test,"seeded is not true");
                    done(); 

                });
                    
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        db.db().collection('quotes').count(function(err,count){
                assert.equal(count,102);
                done(); 
        });
    });

});

 describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, quotes){
                assert(quotes.length===102,"the size of the returned quotes from DB is not 102");
                done();
        });
    });
});

 describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
     Quote.getQuoteFromDB(function(err,result){
           Quote.getQuotesFromDB(function(err2,arr){

                assert.include(arr,result);
               done();
            });

        });
       
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(
          function(err,quote){
          assert.equal(quote.text, "Life isn’t about getting and having, it’s about giving and being","true");
    
   
           assert.equal(quote.author,"Kevin Kruse","true");
       
          done();  
    
          },0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {

        request.get('/abc').expect(404);
        done();

    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {

        api.get('/api/quote').expect('Content-Type', /json/) .expect(200);
        done();

});
    it('/api/quotes should return an array of JSON object when I visit', function(done) {
       
        api.get('/api/quotes').expect('Content-Type', /json/) .expect(200);
        done();

    });
});