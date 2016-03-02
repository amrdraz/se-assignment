var quotes = require('./quotes.js');

module.exports = function(app){
app.get('/api/quote', function(req, res){
	res.end("koko");
/*	quotes.getQuoteFromDB(function(err, quote){
		if(err) res.end(err);
		res.end("quote");
	});
*/});
}