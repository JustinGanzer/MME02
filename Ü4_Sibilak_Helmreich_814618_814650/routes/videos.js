/** This module defines the routes for videos using the store.js as db memory
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
var store = require('../blackbox/store');

var videos = express.Router();

// if you like, you can use this for task 1.b:
var requiredKeys = {title: 'string', src: 'string', length: 'number'};
var optionalKeys = {description: 'string', playcount: 'number', ranking: 'number'};
var internalKeys = {id: 'number', timestamp: 'number'};


// routes **********************
videos.route('/')
    .get(function(req, res, next) {
        // TODO
        res.locals.items = store.select("videos");
        next();
    })
    .post(function(req,res,next) {
    
        //timestamp setzen
        req.body.timestamp = Date.now();
    
        //required-werte müssen vorhanden sein!
        if(!req.body.title || !req.body.src || !req.body.length){
            var err = new Error("required missing!");
            err.status = 400;
            next(err);
        }
        
        //optionale werte setzen
        if(!req.body.description){
            req.body.description = "";
        }
    
        if(!req.body.playcount){
            req.body.playcount = 0;
        }
    
        if(!req.body.ranking){
            req.body.ranking = 0;
        }
    
        //falsche numerische werte rausfiltern
        if(!(typeof req.body.length==="number") || req.body.length < 0){
            var err = new Error("bad request");
            err.status = 400;
            next(err);
        }
    
        if(!(typeof req.body.timestamp==="number")  || req.body.timestamp < 0){
            var err = new Error("bad request");
            err.status = 400;
            next(err);
        }
    
        if(!(typeof req.body.playcount==="number") || req.body.playcount < 0){
            var err = new Error("bad request");
            err.status = 400;
            next(err);
        }

        if(!(typeof req.body.ranking==="number")  || req.body.ranking < 0){
            var err = new Error("bad request");
            err.status = 400;
            next(err);
        }
    
        console.log(req.body);
        
        
        // TODO
        var id = store.insert("videos", req.body); // TODO Check that the body is really a user
        // set code 201 "created" and send the item back
        res.status(201);
        res.locals.items = store.select("videos", id);
        next();
    })
    .put(function(req,res,next){
        var err = new Error('Cannot put  in /videos/ Send to /videos');
        err.status = 405; // Method not allowed.  POST is wrong. GET would be ok.
        next(err);
    })
    
// TODO

videos.route("/:videos")
    .get(function(req,res,next){
        res.locals.items = store.select("videos", req.params.id);
        next();
    })
    .post(function(req,res, next) {
        var err = new Error('Cannot create sub-resource in /videos/id. Send without id');
        err.status = 405; // Method not allowed.  POST is wrong. GET would be ok.
        next(err);
    })
    .put(function(req,res,next){ 
        try{        
            store.replace("videos", req.params.id, req.body);
            res.locals.items = store.select("videos", req.params.id);
            console.log("\n\n\n\n");
            console.log(req.params.id);
            console.log("\n\n\n\n");
            res.status(200);
            next();
        }catch(err){
            err.status = 405; // bad request
            next(err);
        }
        
    })
    .delete(function(req,res,next){
    
        try{        
            store.remove("videos", req.params.id);
            res.status(204);
            next();
        }catch(err){
            console.log("\n\n\n\n");
            console.log("inside catch");
            console.log("\n\n\n\n");
            err.status = 404;
            res.status(404);
            next(err);
        }
        
    /*
        var err = new Error('Not found');
        err.status = 404; 
        next(err);
        */
    });



// this middleware function can be used, if you like (or remove it)
videos.use(function(req, res, next){
    // if anything to send has been added to res.locals.items
    if (res.locals.items) {
        // then we send it as json and remove it
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        // otherwise we set status to no-content
        res.set('Content-Type', 'application/json');
        res.status(204).end(); // no content;
    }
});

module.exports = videos;
