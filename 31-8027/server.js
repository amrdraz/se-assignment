#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');

app.listen(3000, function() {
	console.log("Server is up!");
});
