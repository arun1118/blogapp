import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'


const RegisterScreen = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {userInfo} = useSelector((state)=>state.auth);

    const [register,{isLoading}]=useRegisterMutation()

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate,userInfo]);



    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password!=confirmPassword){
            toast.error("passowrds do not match");
        }
        else{
            try {
                const res=await register({name,email,password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate('/');
            } catch (error) {
                console.log("error in register!")
                console.log(err?.data?.message || err.error);
                toast.error(err?.data?.message || err.error)
            }
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
    function toggleConfirmPasswordVisibility(e){
        let elem=document.getElementById('confirmPassword');
        // console.log(elem)
        if(e.target.innerHTML=='Confirm Password 🙈'){
            e.target.innerHTML='Confirm Password 🐵';
            elem.type='text';
        }
        else{
            e.target.innerHTML='Confirm Password 🙈';
            elem.type='password';
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>

            <Form onSubmit={submitHandler}>

                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type= 'text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={ (e)=> setName(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

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
                    <Form.Label onClick={togglePasswordVisibility} style={{cursor:'pointer'}}>Password 🙈</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={ (e)=> setPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label onClick={toggleConfirmPasswordVisibility} style={{cursor:'pointer'}}>Confirm Password 🙈</Form.Label>
                    <span>{password==confirmPassword?'✔':'❌'}</span> 
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={ (e)=> setConfirmPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type='submit' variant='primary' className='mt-3'>
                    Sign Up
                </Button>

                <Row className='py-3'>
                    <Col>
                        Already have an account? <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen