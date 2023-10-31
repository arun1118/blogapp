import React, { useEffect } from 'react'
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "../slices/postsSlice";
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';

const PostsScreen = () => {
    const dispatch=useDispatch();
    const typeOfPost=window.location.href.split("/").slice(-1)[0] ;
    // const posts = useSelector(selectAllPosts);
    const {posts}=useSelector((state)=> state.posts)
    const postStatus=useSelector(getPostsStatus);
    const error=useSelector(getPostsError);
    const {userInfo}=useSelector((state)=> state.auth);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    // if (postStatus === 'loading') {
    //     content = <p>"Loading..."</p>;
    // } else if (postStatus === 'succeeded') {
    //     content = posts.map((post,idx) => <div key={idx}><h3>{post.title}</h3><p>{post.content}</p></div>)
    // } else if (postStatus === 'failed') {
    //     content = <p>{error}</p>;
    // }

    function renderPosts(){
        if(typeOfPost==='allposts') return posts.map((post)=> <Post title={post.title} content={post.content} key={post._id} postId={post._id} count={post.likes?.length}/>)
        else return posts.map((post)=>{
            if(userInfo._id===post.userRef){return <Post title={post.title} content={post.content} key={post._id} postId={post._id} count={post.likes?.length}/>}
        }) 
    }

    return (
        <div>
            {postStatus==='failed' && <h3>{error}</h3>}
            {postStatus==='loading' && <h3>Loading</h3>}
            {postStatus==='succeeded' && <><h1>{typeOfPost==='allposts'? 'All' : 'Your'} Posts</h1> {renderPosts()} </>}
        </div>
    )
}

export default PostsScreen