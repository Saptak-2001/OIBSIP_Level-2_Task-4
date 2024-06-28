import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${window.location.origin}/api/auth/forgot-password`, {
                email,
                newPassword,
                userName
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
  return (
    <div className="background-container">
    <div className="main-container d-none" id='passwordContainer'>
    <img src="/images/password-logo.png" className='login-logo' alt="forgotPasswordLogo" style={{height: '60%'}}/>
    <div className='container'>
      <p className='heading'>Reset Password</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email">Email Address</label>
            <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder='Enter your username' value={userName} onChange={(e) => setUserName(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password">New Password</label>
            <input type="password" placeholder='Enter a Password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
        </div> 
        <button type='submit'>Reset Password</button> 
      </form>
    </div>
    </div>
    </div>
  )
}
