import React, { useState } from 'react'
import { addNewPost } from '../slices/postsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");

    const handleSave=()=>{
        const initialPost={title,content}
        dispatch(addNewPost(initialPost));
        navigate("/allposts");
    }

    return (
      <div className='container'>
          <label htmlFor="title">Enter the Title</label>
          <input type="text" id="title" value={title} onChange={(e)=> setTitle(e.target.value)}/>

          <label htmlFor="content">Enter the Content</label>
          <textarea id="content" cols="30" rows="10" vaule={content} onChange={(e)=> setContent(e.target.value)}></textarea>

          <button type='button' onClick={handleSave}>Save</button>
      </div>
    )
}

export default CreatePost