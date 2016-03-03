 
    var chai = require('chai').assert;
    var app = require('file:///home/mahi/31-8495/app.js');
	//var request = require('supertest');
	var quotesJs = require('file:///home/mahi/31-8495/quotes.js');
	var db = require('file:///home/mahi/31-8495/db.js');
	// var should = require('chai').should();
	// var expect = require('chai').expect;
	// var include = require('chai').include;
	//var parsedJSON = require('../static/js/quotes.json');
	var supertest = require("supertest");     //still need to install
	var istanbul = require("istanbul");       //still need to install



    function getElementByIndexElseRandom(array, index) {
        index = index === undefined ? Math.floor(Math.random() * array.length) : index;
        return array[index];
    }

function getQuotesFromJSON()  {    //all quotes returnes
	 var json = require('file:///home/mahi/31-8495/quotes.json');
	 return json;

}


qetQuoteFromJSON([index]){        //random if index not passed, else: one on the index


}

seed(function (err, seeded){

})

getQuotesFromDB(function (err, quotes){

})

getQuoteFromDB(function (err, quote){
	//any of quote object in the database
})

getQuoteFromDB(function (err, quote){

	quote.author;
})
