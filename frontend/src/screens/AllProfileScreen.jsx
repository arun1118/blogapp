import React, { useEffect } from 'react'
import { selectAllUsers, getUsersStatus, getUsersError, fetchUsers } from "../slices/usersSlice";
import { useDispatch, useSelector } from 'react-redux';
import UserBox from '../components/UserBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const AllProfileScreen = () => {
    const dispatch=useDispatch();
    // const users = useSelector(selectAllUsers);
    const {users}=useSelector((state)=> state.users)
    const userStatus=useSelector(getUsersStatus);
    const error=useSelector(getUsersError);
    // const {userInfo}=useSelector((state)=> state.auth);

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [userStatus, dispatch])

    function renderUsers(){
      return users.map((user)=> <UserBox name={user.name} email={user.email} key={user._id}/>) 
    }

    return (
        <div>
            {userStatus==='failed' && <h3>{error}</h3>}
            {userStatus==='loading' && <h3>Loading</h3>}
            {userStatus==='succeeded' && <>
            <h3>All Profiles</h3>
            <Container>
                <Row>
                    {renderUsers()}
                </Row>
            </Container>
            </>}
        </div>
    )
}

export default AllProfileScreen