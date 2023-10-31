import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    userRef:{
        type: String
    },
    likes:[String]
},{
    timestamps: true
})

const Post=new mongoose.model('Post', postSchema)

export default Post;
