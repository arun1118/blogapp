import React from 'react'
import Hero from '../components/Hero'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const HomeScreen = () => {
  const {userInfo}=useSelector((state)=> state.auth);

  if(userInfo){
    return <Navigate to="/allposts" replace={true}/>
  }
  
  return <Hero />
}

export default HomeScreen