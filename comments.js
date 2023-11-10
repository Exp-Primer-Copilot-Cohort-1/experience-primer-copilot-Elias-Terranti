//create a web server 
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');

//get all comments
router.get('/all', (req, res, next) => {
    Comment.find((err, comments) => {
        if(err){
            res.json({success: false, msg: 'Failed to get comments'});
        }else{
            res.json(comments);
        }
    });
});

//get all comments for a post
router.get('/post/:id', (req, res, next) => {
    Comment.find({post: req.params.id}, (err, comments) => {
        if(err){
            res.json({success: false, msg: 'Failed to get comments'});
        }else{
            res.json(comments);
        }
    });
});

//add comment
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newComment = new Comment({
        content: req.body.content,
        post: req.body.post,
        user: req.body.user
    });
    Comment.addComment(newComment, (err, comment) => {
        if(err){
            res.json({success: false, msg: 'Failed to add comment'});
        }else{
            res.json({success: true, msg: 'Comment added'});
        }
    });
});

//delete comment
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Comment.findOneAndDelete({_id: req.params.id}, (err, comment) => {
        if(err){
            res.json({success: false, msg: 'Failed to delete comment'});
        }else{
            res.json({success: true, msg: 'Comment deleted'});
        }
    });
});

module.exports = router;