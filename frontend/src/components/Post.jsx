import React from 'react'
import { likePost } from '../slices/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Post = ({title, content, postId, count}) => {
  const dispatch=useDispatch();

  const {userInfo}=useSelector((state)=> state.auth);

  const handleLike=()=>{
    dispatch(likePost({postId,userId: userInfo._id}));
    console.log("liking ", postId);
  }

  return (
    <Card style={{ width: '50rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {content}
        </Card.Text>
        <div className="like">
          <button onClick={()=> handleLike()}>❤</button>
          <p>Liked by : {count}</p>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Post