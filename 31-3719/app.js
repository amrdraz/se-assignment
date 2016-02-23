var express = require("express")
var path = require("path")
var db = require("./db")
var q = require("./quotes")

var app = express()

app.use(express.static(path.join(__dirname, 'public')));

db.connect(function(db) {
	q.seed(function(err, seeded) {
	if(err) throw err
	if(!seeded)
		console.log("DB was already seeded.")
})
})


app.get('/api/quote', function(req, res) {
	var quote = q.getQuoteFromDB(function(err, _quote) {
		if (err) throw Error("Error on fetching a quote from the database")
		res.json(_quote)
	})
})


app.get('/api/quotes', function(req, res) {
	var quotes = q.getQuotesFromDB(function(err, _quotes) {
		if (err) throw Error("Error on fetching quotes from the database")
		res.json(_quotes)
	})
})


app.get('/', function(req, res) {
	res.render("public/index.html")
})

module.exports = app