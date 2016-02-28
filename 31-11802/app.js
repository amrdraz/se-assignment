var express = require('express');
var app = express();

module.exports=app;

app.use(express.static(__dirname +'/public'));
/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/

app.get('/api/post', function(req, res) {
    var post = {
        "title": "Title added with Ajax from a /api/post route",
        "content": "This post's body text was populated with JavaScript"
    }
    res.send(post)
});
