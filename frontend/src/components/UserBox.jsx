import React from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const UserBox = ({name, email}) => {
  return (
    <Col>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{email}</Card.Text>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default UserBox