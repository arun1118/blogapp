import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { clearData } from '../slices/postsSlice';
import { clearDataUser } from '../slices/usersSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {

  const {userInfo} = useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  const [logoutApiCall]=useLogoutMutation();
  const navigate=useNavigate();

  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(clearData());
      dispatch(clearDataUser());
      dispatch(logout());
      navigate('/')    
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand href='/'>Blog App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {
              userInfo
              ? 
              (
                <>
                <div className="header-links">
                <Link to='/allprofile'>All Profile</Link>
                <Link to='/allposts'>All Posts</Link>
                <Link to='/posts'>My Posts</Link>
                <Link to='/create'>Create Post</Link>
                </div>

                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      My Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  {/* <LinkContainer to='/allprofile'>
                    <NavDropdown.Item>
                      All Profiles
                    </NavDropdown.Item>
                  </LinkContainer> */}
                  {/* <LinkContainer to='/allposts'>
                    <NavDropdown.Item>
                      All Posts
                    </NavDropdown.Item>
                  </LinkContainer> */}
                  {/* <LinkContainer to='/posts'>
                    <NavDropdown.Item>
                      My Posts
                    </NavDropdown.Item>
                  </LinkContainer> */}
                  <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                  </NavDropdown.Item>
                </NavDropdown>
                </>
              )
              : 
              (
                <>
                <LinkContainer to='/login'>
                    <Nav.Link>
                        <FaSignInAlt /> Sign In
                    </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/register'>
                    <Nav.Link>
                        <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                </LinkContainer>
                </>
              )
              }
                
                
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;