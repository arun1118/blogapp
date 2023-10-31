import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';

// ------------------------------------------------------------------------------------------------------------------
// @desc    add a post
// route    POST /api/posts/add
// @access  Private
const addPost= asyncHandler(async(req,res)=>{
    const {title,content} = req.body;
    console.log("to save a post");
    let userRef=req.user._id.toString();

    const post=await Post.create({
        title,content,userRef
    })

    if(post){
        res.status(201).json({
            _id: post._id,
            title: post.title,
            content: post.content,
            userRef: post.userRef,
            likes: post.likes
        });
    }
    else{
        res.status(400);
        throw new Error('Could not save post!');
    }
})

// ------------------------------------------------------------------------------------------------------------------
// @desc    like a post
// route    POST /api/posts/like
// @access  Private
const likePost= asyncHandler(async(req,res)=>{
    const {postId} = req.body;

    let userRef=req.user._id.toString();
    // console.log("post id :",postId);
    // console.log("like/unlike by ", userRef);

    let isLiked=await Post.exists({_id: postId, likes: {$in: [userRef]}});
    if(isLiked){
        await Post.updateOne({_id: postId}, {$pull: {likes: userRef}});
        res.status(200).json("unliked a post");
    }
    else{
        await Post.updateOne({_id: postId}, {$push: {likes: userRef }});
        res.status(200).json("liked a post")
    }
})

// ------------------------------------------------------------------------------------------------------------------
// @desc    get a user's post
// route    POST /api/posts/get
// @access  Private
const getPosts= asyncHandler(async(req,res)=>{
    let userRef=req.user._id.toString();

    const postData=await Post.find({userRef})

    if(postData){
        res.status(201).json({postData});
    }
    else{
        res.status(400);
        throw new Error(`Could not find this user's post!`);
    }
})

// ------------------------------------------------------------------------------------------------------------------
// @desc    get all posts
// route    POST /api/posts/getall
// @access  Public
const getAllPosts= asyncHandler(async(req,res)=>{
    const postData=await Post.find({});

    if(postData){
        res.status(200).json({postData});
    }
    else{
        res.status(400);
        throw new Error(`Could not find any post!`);
    }
})


export {addPost, getPosts, getAllPosts, likePost}