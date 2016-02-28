var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(err, d) {
       if (err) return done(err);
       else done();
    });
});


//DONE:
describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        // TODO
       assert.equal(arr.indexOf(Quote.getElementByIndexElseRandom(arr)) != -1,true);
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,0), arr[0]);
    });
    it("should return the last element if we also pass the index", function() {
        // TODO
        assert.equal(Quote.getElementByIndexElseRandom(arr,arr.length-1), arr[arr.length-1]);
    });
});


//DONE:
describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        assert.equal(Quote.getQuotesFromJSON().length == 102,true);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        assert.equal(Quote.getQuotesFromJSON()[0].author == 'Kevin Kruse',true);
    });
});


// DONE:
describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var quote = Quote.getQuoteFromJSON();
        var author = quote.author;
        var text = quote.text;
        assert.equal(author != 'undefined' && text != 'undefined',true)
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var all = Quote.getQuotesFromJSON();
       // console.log(all);
       var quote = Quote.getQuoteFromJSON()
        // console.log(quote);

       assert.equal(Quote.contains(all,quote),true);
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var first = Quote.getQuotesFromJSON()[0];
        var quote = Quote.getQuoteFromJSON(0);
        assert.equal(Quote.equals(first,quote),true);
    });
});


//DONE:
// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(val,seeded){
           assert.equal(seeded,true);
            done(); 
        });
    });  
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.seed(function(val,seeded){
            
            Quote.getQuotesFromDB (function(err,data){
                assert.equal(data.length==102,true);
            done();
            });
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(val,seeded){
           assert.equal(seeded,false);
            done(); 
        });
    });

    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.seed(function(val,seeded){
            Quote.getQuotesFromDB (function(err,data){
                assert.equal(data.length==102 && seeded==false,true);
                done();
            });
        });
    });
});
            

//DONE:
describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function (err,data){
            assert.equal(data.length==102,true);
            done();
        });
    });
});


//DONE:
describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuotesFromDB(function(err,data){
            Quote.getQuoteFromDB(function (err,quote){
                assert.equal(Quote.contains(data,quote) ,true);
                done();
            })
        }); 
    });
        
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuotesFromDB(function(err,data){
            Quote.getQuoteFromDB(function (err,quote){
                assert.equal(Quote.equals(quote,data[0]),true);
                done();
            },0)
        }); 
    });
 });



//DONE:
describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/mariam').expect(404).end(done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get('/api/quote')
            .expect('Content-Type','application/json')
            .expect(200)
            .end(function(err,res){
            if(err) throw err;
            var obj = JSON.parse(res.text);
            if(obj.author != 'undefined' && obj.text != 'undefined' && obj.id != 'undefined')
                done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
         request.get('/api/quotes')
            .expect('Content-Type','application/json')
            .expect(200)
            .end(function(err,res){
            if(err) throw err;
            var obj = JSON.parse(res.text);
            var bool = true;
            for(var i=0; i<obj.length;i++){
           		if(obj[i].author === 'undefined' || obj.text === 'undefined' || obj.id === 'undefined'){
            		bool = false;
            		assert.equal(bool,true);
            		done();
            	}		
        	}
        	assert.equal(bool,true);
            done();
        });
    });
});