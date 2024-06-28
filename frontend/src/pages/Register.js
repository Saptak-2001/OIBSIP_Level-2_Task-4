import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`${window.location.origin}/api/auth/sign-up`, {
              name,
              phone,
              userName,
              email,
              password,
          });
          if (res && res.data.success) {
              toast.success(res.data && res.data.message);
              navigate("/login");
          } else {
              toast.error(res.data.message);
          }
      } catch (error) {
          toast.error("Something Went Wrong");
      }
    }
  return (
    <div className="background-container">
    <div className="main-container d-none" id="registerContainer">
        <img src="/images/register_logo_cyz8h5.avif" className="login-logo" alt="register-logo" />
        <div className="container">
            <p className="heading mb-3">Register Here!</p>
            <form onSubmit={handleRegister}>
            <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} required/>
            </div> 
            <div className="mb-3">
            <label htmlFor="phone">Phone No</label>
            <input type="number" placeholder='Enter your phone no' onChange={(e) => setPhone(e.target.value)} value={phone}/>
            </div>  
            <div className="mb-3">
            <label htmlFor="email">Email Address</label>
            <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder='Enter a username' value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter a password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div> 
            <button type='submit'>Register</button>      
            <span>Already have an account ? <Link to="/login" style={{textDecoration:'none'}}>Login</Link></span>
            </form>
        </div>
    </div>
    </div>
  )
}
