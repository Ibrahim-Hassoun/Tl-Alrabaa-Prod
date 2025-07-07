
import Navbar from './layouts/Navbar/Navbar';
import './App.css'
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Register from './pages/Register/Register';
function App() {
  

  return (
   <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          
          
        </Routes>
          
      </BrowserRouter>
   </>
   
  )
}

export default App
