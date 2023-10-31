import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL='/api/posts';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(`${POSTS_URL}/getall`)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    // console.log("initial post : ", initialPost);
    const response = await axios.post(`${POSTS_URL}/add`, initialPost)
    // console.log("returning : ", response.data);
    return response.data
})

export const likePost = createAsyncThunk('posts/likePost', async ({postId,userId}) => {
    console.log("initial post : ", postId);
    const response = await axios.post(`${POSTS_URL}/like`, {postId})
    // console.log("returning : ", response.data);
    return {postId,userId}
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userRef) {
                return {
                    payload: {
                        title,
                        content,
                        userRef,
                        id: nanoid()
                    }
                }
            }
        },
        clearData: (state,action)=>{
            state.posts=[];
            state.status='idle';
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = action.payload.postData;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload)
            })
            .addCase(likePost.fulfilled, (state, action) => {
                let postId=action.payload.postId;
                let userId=action.payload.userId;
                state.posts.map((post)=>{
                    if(post._id===postId){
                        if(post.likes.includes(userId)){
                            post.likes=post.likes.filter((id)=> id!==userId)
                        }
                        else{
                            post.likes.push(userId);
                        }
                    }
                    return post;
                })
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded, clearData } = postsSlice.actions

export default postsSlice.reducer