/**
 * Created by Justin Sibilak on 21.04.2016.
 */
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));

// add and configure Route /
app.get('/*', function (req, res) {
    res.send('<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head><meta charset="utf-8"></head>' +
        '<body><h1>Hello World!</h1></body>' +
        '</html>'
    );
});

var server = app.listen(3000, function () {
    console.log('helloworld app is ready and listening at http://localhost:3000');
});