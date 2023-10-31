import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import {toast} from 'react-toastify';
import Loader from '../components/Loader'

const LoginScreen = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate,userInfo]);

    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            const res=await login({email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/');
        } catch (err) {
            console.log("error in login!")
            console.log(err?.data?.message || err.error);
            toast.error(err?.data?.message || err.error)
        }
    }
    function togglePasswordVisibility(e){
        let elem=document.getElementById('password');
        // console.log(elem)
        if(e.target.innerHTML=='Password 🙈'){
            e.target.innerHTML='Password 🐵';
            elem.type='text';
        }
        else{
            e.target.innerHTML='Password 🙈';
            elem.type='password';
        }
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type= 'email'
                        placeholder='Enter Email Id'
                        value={email}
                        onChange={ (e)=> setEmail(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label onClick={togglePasswordVisibility} style={{cursor:'pointer'}}> Password 🙈</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={ (e)=> setPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>
                
                {isLoading && <Loader />}
                
                <Button type='submit' variant='primary' className='mt-3'>
                    Sign In
                </Button>

                <Row className='py-3'>
                    <Col>
                        Create an account? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen