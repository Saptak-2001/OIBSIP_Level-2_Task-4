import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';
import axios from 'axios';

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${window.location.origin}/api/auth/login`, {
                userName,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate("/home");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    }

  return (
    <Layout title={"Authentication System | Login"}>
    <div className='background-container'>
      <div className="main-container d-none" id="loginContainer">
        <img src="/images/login-logo_a70u6f.avif" className='login-logo' alt="login-logo" />
        <div className="container">
            <p className="heading">Welcome Back!</p>
            <p className="sub-heading">Login to continue</p>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder='Enter your username' value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Enter a password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <Link to='/forgot-password' style={{textDecoration: 'none', marginTop: '10px'}} className='link'><p className='mt-2'>Forgot Password ?</p></Link>
                </div> 
                <button type='submit'>Login</button>      
                <span>Doesn't have an account ? <Link to="/sign-up" style={{textDecoration:'none'}} className='link'><p>Register</p></Link></span>
            </form>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Login;
