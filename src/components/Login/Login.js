import React from 'react'
import { Helmet } from 'react-helmet';
import LoginForm from './LoginForm';
import './login.css'
const Login = () => {
    return (
        <>
            <Helmet>
                <title>Login | OTT Rentals</title>
            </Helmet>
            <LoginForm/>
        </>
    )
}

export default Login
