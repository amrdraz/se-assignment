
var database = require('../db');
var quotes = require('../quotes');
var fs = require('fs');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index')
};
