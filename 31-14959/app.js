var express = require('express');
var app = express();
var path = require('path');
app.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/' , function (req,res ){
  res.render("/public/index.html");



});

// var router = express.Router();
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
//
// });
// /// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// /// error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });
//
module.exports = app;
