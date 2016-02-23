var express = require("express")
var path = require("path")
var db = require("./db")
var express = express()

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function(req, res) {
	res.render()
})