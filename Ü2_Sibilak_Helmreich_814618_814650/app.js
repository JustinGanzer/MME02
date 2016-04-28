/**
 * Created by Justin Sibilak on 21.04.2016.
 */
var express = require('express');
var path = require('path');
var fs = require("fs");
var app = express();
var files = {};

//To create a virtual path prefix (where the path does not actually exist in
// the file system) for files that are served by the express.static function,
// specify a mount path for the static directory, as shown below:
app.use('/static', express.static('static'));

app.get("/time",function(req,res){
    res.format({
        "text/plain":function(){
            console.log("send date");
            res.send(Date());
        }
    });
});

app.get("/readfile",function(req,res){
    res.format({
        "text/plain":function(){
            if(files["testfile"]){
                console.log("file exists");
                res.send(files["testfile"].toString());
            }else{
                fs.readFile("testfile.txt",function(err,content){
                    if(err){
                        throw err;
                    }
                    console.log("file doesnt exist in dictioniary, saving");
                    files["testfile"] = content;   
                    res.send(content.toString());
                });
            }
            
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