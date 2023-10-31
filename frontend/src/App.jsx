import React from 'react'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <>
    <Header />
    {/* <HomeScreen /> */}
    <ToastContainer />
    <Container className='my-2'>
      <Outlet />
    </Container>
    </>
  )
}

export default App