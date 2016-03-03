var express = require('express');
var app = express();

app.use(express.static('./static'));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

app.get('/api/post', function(req, res) {
    var post = {
        "title": "Title added with Ajax from a /api/post route",
        "content": "This post's body text was populated with JavaScript"
    }
    res.send(post)
});
