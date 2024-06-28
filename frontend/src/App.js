import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Homepage from './pages/Homepage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='App'>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/sign-up' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/home' element={<Homepage />} />
      </Routes>
      
    </div>
  );
}

export default App;
