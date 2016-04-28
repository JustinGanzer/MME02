/**
 * Created by Justin Sibilak on 21.04.2016.
 */
var express = require('express');
var path = require('path');
var fs = require("fs");
var app = express();

//To create a virtual path prefix (where the path does not actually exist in
// the file system) for files that are served by the express.static function,
// specify a mount path for the static directory, as shown below:
app.use('/static', express.static('static'));

app.get("/time",function(req,res){
    res.format({
        "text/plain":function(){
            res.send(Date());
        }
    });
});

app.get("/readfile",function(req,res){
    res.format({
        "text/plain":function(){
            fs.readFile("testfile.txt",function(err,content){
                if(err)
                    throw err;
                res.send(content.toString());
            });
        }
    });
});

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