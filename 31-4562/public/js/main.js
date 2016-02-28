/*
var quotesfile = require('../../quotes.js');
var QoutesArray ;

var getQuotes = module.exports.getQuotes = function (quotes){
QoutesArray = quote ; 
document.getElementById('h1quote').textContent(quote.text);
};

document.body.addEventListener('click', function(){
var quote = quotesfile.getElementByIndexElseRandom(QoutesArray);
document.getElementById('h1quote').textContent(quote.text);
}, true); 

