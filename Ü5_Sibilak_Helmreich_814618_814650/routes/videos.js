/** This module defines the routes for videos using a mongoose model
 *
 * @author Johannes Konert
 * @licence CC BY-SA 4.0
 *
 * @module routes/videos
 * @type {Router}
 */

// remember: in modules you have 3 variables given by CommonJS
// 1.) require() function
// 2.) module.exports
// 3.) exports (which is module.exports)

// modules
var express = require('express');
var logger = require('debug')('me2u4:videos');

// TODO add here your require for your own model file

var videos = express.Router();
//schema

var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost:27017/me2");
var VideoModel = require("../models/videos");

// routes **********************
videos.route('/')
    .get(function(req, res, next) {
    
        VideoModel.find({},function(err,videos){
            
            res.status(200);
            res.locals.items = videos;
            res.json(videos);
        }); 
        
        //next();
    })
    .post(function(req,res,next) {
        
        var video = new VideoModel(req.body);
    
        video.save(function(err){
            if(!err){
                res.status(201).json(video);
            }else{
                err.status = 400;
                err.message += " in fields: "
                                + Object.getOwnPropertyNames(err.errors);
                
            }
            
            //next(err);
            
        });

    });

videos.route('/:id')
    .get(function(req, res, next){
        VideoModel.findOne({
            '_id' : req.params.id
        }, function (err, video) {
            res.json(video);
        })
    })
    .post(function (req, res, next) {
        var err = new Error("YOU NO POST WITH AN ID! IS BAD! NOT ALLOWED");
        err.status = 405;
        next(err);
    })
    .delete(function(req, res, next){
        VideoModel.findOne({
            '_id' : req.params.id
        }, function (err, video) {
            if(video !== null) {
                video.remove();
                res.json(video);
            }else{
                var err = new Error("Video witho sucho ido doesno existoo!");
                err.status = 404;
                next(err);
            }
        })
    })
    .patch(function (req, res, next) {
        if (req.params.id == req.body.id) {
        VideoModel.findByIdAndUpdate(req.params.id, req.body, function (err) {
            if (err) next(err);
            res.json({message: 'Success!'});
        });
    }else{
            var err = new Error("Request ID does not match Body ID");
            err.status = 400;
            next(err);
        }
    })
    .put(function (req, res, next) {
        VideoModel.findById(req.params.id, function(err, video) {
            if (!video)
                next(err);
            else {
                if (req.params.id == req.body.id) {

                    var temp = req.body;

                    temp["_id"] = temp["id"];
                    delete temp["id"];

                    var bodyparams = Object.keys(temp);
                    console.log(bodyparams);
                    var schemaparams = Object.keys(VideoModel.schema.paths);
                    console.log(schemaparams);

                    //Help Function that checks if obj is in array. True if yes, undefined if no
                    function include(obj, array) {
                        for(var i=0; i<array.length; i++) {
                            if (array[i] == obj) return true;
                        }
                        return false;
                    }

                    //Checks if all FilterAttributes are in MyAttributes, if no ERROR 9000!
                    for(var i=0; i<bodyparams.length; i++) {
                        if (!include(bodyparams[i], schemaparams)){
                            var err = new Error('Illegal Attribute');
                            err.status = 400;
                            return next(err);

                        }
                    }

                    video.remove();
                    video = new VideoModel(req.body);
                    video.save(function(err){
                        if(!err){
                            res.status(201).json(video);
                        }else{
                            err.status = 400;
                            err.message += " in fields: "
                                + Object.getOwnPropertyNames(err.errors);

                        }

                        //next(err);

                    });

                }else{
                    var err = new Error("Request ID does not match Body ID");
                    err.status = 400;
                    next(err);
                }
            }
        });
    });

// this middleware function can be used, if you like or remove it
videos.use(function(req, res, next){
    // if anything to send has been added to res.locals.items
    if (res.locals.items) {
        // then we send it as json and remove i
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        // otherwise we set status to no-content
        res.set('Content-Type', 'application/json');
        res.status(204).end(); // no content;
    }
});

module.exports = videos;
