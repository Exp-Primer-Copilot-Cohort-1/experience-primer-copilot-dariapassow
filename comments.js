//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 8080;

//Read the comments.json file
var commentsFile = path.join(__dirname, 'comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Get comments
app.get('/api/comments', function(req, res) {
    fs.readFile(commentsFile, function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

//Post comments
app.post('/api/comments', function(req, res) {
    fs.readFile(commentsFile, function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(commentsFile, JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});

//Start server
app.listen(port, function() {
    console.log('Server listening on port ' + port);
});