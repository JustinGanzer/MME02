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
            
            next(err);
            
        });
    
        //next();
    });

videos.route("/:id")
    .get(function(req,res,next){
        
    })
    .post(function(req,res,next){
    
    })
    .put(function(req,res,next){
    
    })
    .patch(function(req,res,next){
    
    })
    .delete(function(req,res,next){
    
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
