
import Navbar from './layouts/Navbar/Navbar';
import './App.css'
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Register from './pages/Register/Register';
import Admin from './pages/Admin/Admin';
import AuthGuard from '../lib/middleware/AuthGuard';
import { useEffect } from 'react';
import request from '../lib/remote/axios';
import { useDispatch } from 'react-redux';
import { logout } from '../core/redux/AuthSlice/AuthSlice';


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
    const verifyToken = async () => {
      const { success } = await request({ method: 'GET', route: '/profile' });

      if (!success) {
        localStorage.removeItem('token');
        dispatch(logout());
      }
    };

    verifyToken();
  }, []);
  return (
   <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          
          
        </Routes>
          
      </BrowserRouter>
   </>
   
  )
}

export default App
