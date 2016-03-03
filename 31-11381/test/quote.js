// tests/quotes.js

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
        var result=Quote.getElementByIndexElseRandom(arr);
        assert(arr.indexOf(result)>-1,"it does not contain the element");
    });
    it("should return the first element if we also pass the index 0", function() {
        var result=Quote.getElementByIndexElseRandom(arr,0);
        assert(result==1,"it does not return the first element (1)");
    });
    it("should return the last element if we also pass the index", function() {
        var result=Quote.getElementByIndexElseRandom(arr,arr.length-1);
        assert(result==5,"it does not return the first element (1)");
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        
        var arr=Quote.getQuotesFromJSON();
        assert(arr.length==102,"the size of the array returned from JSON is Not 102 ");
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var arr=Quote.getQuotesFromJSON();
        assert(arr[0].author=="Kevin Kruse","the first author is not Kevin Kurse so you are returning the wrong array");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var oneQuote=Quote.getQuoteFromJSON();
        assert(oneQuote.author!=undefined && oneQuote.text!=undefined,"the object returned is not a quote");
    });
    it('should return a random quote if index not specified', function() {
       var oneQuote=Quote.getQuoteFromJSON();
       var arr=Quote.getQuotesFromJSON();
       assert(arr.indexOf(oneQuote)>-1,"it does not contain the element");

    });
    it('should return the first quote if we pass 0', function() {
        var oneQuote=Quote.getQuoteFromJSON(0);
        assert(oneQuote.text=="Life isn’t about getting and having, it’s about giving and being" &&oneQuote.author=="Kevin Kruse","the first Quote in quote.JSON and the returned quote are not identical");
    });
});

// // quotes collection should be called quotes
describe('seed', function() {
    
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        var test=true;
        db.connect(function(db){
		   		Quote.seed(function(err,flag){
	   				if(flag==true){
	   					console.log(err+ " true ");	
	   					test=true;
					}
					else{
						console.log(err+" seeded = false");
						test=false;
					}
                    assert(test,"seeded is not true");
                    done(); 

	   			});
	   				
	   	});
	   	
    });

    it('should have populated the quotes collection with 102 document', function(done) {
        
        db.db().collection('quotes').count(function(err,count){
				console.log("count : "+count);
                assert(count==102,"the database size is not =102");
                done(); 
        });

        
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        db.connect(function(db){
                Quote.seed(function(err,flag){
                    if(flag==false){
                        console.log("it is already seeded so it will not seed again"+ " true "); 
                        test=true;
                    }
                    else{
                        console.log("it is already seeded but it seeded again which is not correct"+" seeded = false");
                        test=false;
                    }
                    assert(test,"seeded is not true");
                    done(); 

                });
                    
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        db.db().collection('quotes').count(function(err,count){
                console.log("count : "+count);
                assert(count==102,"the database size was not =102 after the second seeding");
                done(); 
        });
    });

});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, quotes){
                assert(quotes.length==102,"the size of the returned quotes from DB is not 102");
                done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuotesFromDB(function(err1, quotes){    
            Quote.getQuoteFromDB(function(err,quote){
                if(err==null){
                    var flag=false;
                    var i=0;
                    while(i<quotes.length){
                        if(quotes[i].text==quote.text&&quotes[i].author==quote.author){
                            flag=true;
                        }
                        i++;
                    }
                    assert(flag,"it does not contain the element");
                    done();
                }
                else{
                    assert(false,err);
                    done();
                }
            });
        });    
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuotesFromDB(function(err1, quotes){    
            Quote.getQuoteFromDB(function(err,quote){
                if(err==null){
                    
                    assert(quote.text=="Life isn’t about getting and having, it’s about giving and being"&& quote.author=="Kevin Kruse","it does not return the first element");
                    done();
                }
                else{
                    assert(false,err);
                    done();
                }
            },0);
        });
    });
});

describe('API', function() {
    
    it("should return a 404 for urls that don't exist", function(done) {
      
      request('/ay7aga.com', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
       
      });


      done();
    });
    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request('/api/quote', function(error, response, returnedQuote) {
             assert.isObject(returnedQuote, 'returned object is not a quote');
             assert.property(returnedQuote, '_id');
             assert.property(returnedQuote, 'author');
             assert.property(returnedQuote, 'text');
             
            
        });
        done();
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
            request('/api/quotes', function(error, response, array) {
             assert.isArray(array, 'the returned object is not an array of quotes');

            
      });
        done();
    });

  });