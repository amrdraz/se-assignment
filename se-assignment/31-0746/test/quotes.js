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

var contains = function(toarray,obj)
{
    
    for(var i=0; i<toarray.length;i++)
        if(obj==toarray[i])
            return true;
        return false;
}



describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var trial= Quote.getElementByIndexElseRandom(arr);
        assert.equal(contains(arr,trial),true);
       
    });
    it("should return the first element if we also pass the index 0", function() {
        var trial= Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(arr[0],trial);
        

        
    });
    it("should return the last element if we also pass the index", function() {
          var trial= Quote.getElementByIndexElseRandom(arr,arr.length-1);
        assert.equal(arr[arr.length-1],trial);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var trial= Quote.getQuotesFromJSON();
        assert.equal(trial.length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var trial= Quote.getQuotesFromJSON();
        assert.equal(trial[0].author,'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
       var trial= Quote.getQuoteFromJSON();
        assert.equal((trial.author!==undefined && trial.text!==undefined),true);
    });
    it('should return a random quote if index not specified', function() {
    var trial= Quote.getQuoteFromJSON();
        assert.equal(contains(Quote.getQuotesFromJSON(),trial),true);
            });
    it('should return the first quote if we pass 0', function() {
        var trial= Quote.getQuoteFromJSON(0);
        assert.equal(Quote.getQuotesFromJSON()[0],trial);
    });
});


// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err,seeded)
        {
            assert(seeded, "Error");
            done();
        });
        
    });
    it('should have populated the quotes collection with 102 document', function(done) {
    Quote.getQuotesFromDB(function(err,seeded)
        {
            assert(seeded.length==102, "Error");
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
         Quote.seed(function(err,seeded)
        {
            assert(!seeded, "Error");
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
         Quote.getQuotesFromDB(function(err,seeded)
        {
            assert(seeded.length==102, "Error");
            done();
        });
    });
   


});
describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err,seeded)
        {
            assert(seeded.length==102, "Error");
            done();
    
    });
});

});
describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
         Quote.getQuoteFromDB(function(err,seeded)
        {
            if(err)
                assert(false);
            Quote.getQuotesFromDB(function(err,seeds)
            {
                if(err)
                    assert(false);
                assert.include(seeds,seeded);
                done();
            });
           
    
    });
});

 it('should return error', function(done) {
        
         var database= require("../db.js");

         database.connect(function(err, db) {
      if (err) return done(err);
     });
         done();
    });


it('should return error2', function(done) {
        

         var database= require("../db.js");
            database.db().dbURL=",xfnvxk";
            db.db().dbURL="skdnfskdfn";
         database.connect(function(err, db) {
      if (err) return done(err);
     });
         done();
    });



    it('should return the first quote if passed 0 after callback', function(done) {
         Quote.getQuotesFromDB(function(err,seeds)
        {
            Quote.getQuoteFromDB(function(err,seeded)
            {
                console.log(seeds[0].author);
                console.log(seeded.author);
                
                assert.equal(seeds[0].author==seeded.author && seeds[0].text==seeded.text , true);
                done();
            },0);
    });

});

});
describe('API', function() {
    request = request(app);
     it("should return a 404 for urls that don't exist", function(done) {
      request.get('/wala').set('Accept','application/json').expect(404).end(function(err,res){
       if(err)
            return done(err);
      });

        done();
     });
     it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
       request.get("/api/quote").set("Accept", "application/json").expect(200).end(function(err,res){
            expect(res.body).to.have.property("author");
            expect(res.body).to.have.property("text");
            expect(res.body).to.have.property("_id");
          
          });  done();
          
       });
      it('', function(done) {
       request.get("/api/quotes").set("Accept", "application/json").expect(200).end(function(err,res){
            assert.equal(102,res.length);
          
          });  done();
          
       });
 
     it('/api/quotes should return an array of JSON object when I visit', function(done) {
       request.get("/api/quotes").set("Accept", "application/json").expect(200).end(function(err,res){
            expect(res.body).to.be.a('array');
       });     done();
       
     });



      });

