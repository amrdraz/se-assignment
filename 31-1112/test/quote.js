// tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    db.connect(function(err, db) {
       if (err) return done(err);
       else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function(done) {

        var x = Quote.getElementByIndexElseRandom(arr);
        assert.include(arr,x);
        done();
    });

    it("should return the first element if we also pass the index 0", function(done) {
        var lala = Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(arr[0],lala);
        done();
    });
    
    it("should return the last element if we also pass the index", function(done) {
        
        var index = arr.length -1;
        var toto = Quote.getElementByIndexElseRandom(arr, index);
        assert.equal(arr[arr.length -1],toto);
        done();
    });

});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function(done) {
            var mimi = Quote.getQuotesFromJSON();
        assert.lengthOf(mimi,102);
        done();

    });

    it("first quote in the array's author should be Kevin Kruse", function(done) {
    
             var x2 = Quote.getQuotesFromJSON();
              assert.equal(x2[0].author,"Kevin Kruse");
        done();

    });

});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function(done) {

           var xyz = Quote.getQuoteFromJSON();
              assert(xyz.author != "undefinded") ;
              assert(xyz.text!= "undefinded") ;
        done(); 


    });
    it('should return a random quote if index not specified', function(done) {
   
        var lol = Quote.getQuoteFromJSON();
              var lol2=Quote.getQuotesFromJSON();
                      assert.include(lol2,lol);

        done(); 

    });
    it('should return the first quote if we pass 0', function(done) {

            var xx = Quote.getQuoteFromJSON(0);
            var yy=Quote.getQuotesFromJSON();
                assert.equal(yy[0],xx);

            done();

    });
 });

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {

            var xxtany= Quote.seed(function(err, seeded){
                 assert.equal(seeded,true);
                        done();
            });
            
          

            });
    it('should have populated the quotes collection with 102 document', function(done) {

            var xnein= Quote.getQuotesFromDB(function(err,data){
             assert.lengthOf(data,102);
            done();     
            });
           

    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {

            var xja= Quote.seed(function(err, seeded){
                 assert.equal(seeded,false);
                        done();
            });

    });
    it('should not seed db again if db is not empty', function(done) {

              var vercreative= Quote.getQuotesFromDB(function(err,data){
             assert.lengthOf(data,102);
            done();     
            });

    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {

         Quote.getQuotesFromDB(function(err,data){
             assert.lengthOf(data,102);
            done();     
            });

    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {

         Quote.getQuotesFromDB(function(err,data){
                var tooMuchX =Quote.getQuoteFromDB(function(err,tooMuchX){

                assert.include(data,tooMuchX);
            done();     
                });
            });


    });
    it('should return the first quote if passed 0 after callback', function(done) {
           Quote.getQuotesFromDB(function(err,data){
                var x =Quote.getQuoteFromDB(function(err,x){
                    
                assert.equal(data[0].text,x.text);
                assert.equal(data[0].author,x.author);
            done();     
                },0);
            });

    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('*').expect(404);
        done();

    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {

        var quote =request.get('/api/quote').expect('content-Type','application/json');
        assert(quote._id!="undefinded");
        assert(quote.text!="undefinded");
        assert(quote.author!="undefinded");
        done();

    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {

        var quotes =request.get('/api/quotes',function(req,res){
            expect(res.to.br.instanceof(Array));
        }).expect('content-Type','application/json');
                          done();


    });
 });
