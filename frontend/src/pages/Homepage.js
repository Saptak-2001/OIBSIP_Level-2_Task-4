import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdCheckmarkCircle } from "react-icons/io";
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { useAuth } from '../context/auth';

export default function Homepage() {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({
          ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth');
        toast.success('Logged out successfully')
        navigate('/login');
    }

  return (
    <Layout title={"Authentication System | Secure Page"}>
    <div className="background-container">
    <div className='main-container success-main-container d-none' id='securePage'>
      <div className="success-container">
        <IoMdCheckmarkCircle className='success-icon'/>
        <p className="success-message"><strong>Welcome, {auth?.user?.name}!</strong></p>
        <p className="secure-page-message">You've successfully logged in to the secure page :)</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </div>
    </Layout>
  )
}
