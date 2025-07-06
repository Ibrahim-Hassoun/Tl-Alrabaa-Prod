
import Navbar from './layouts/Navbar/Navbar';
import './App.css'
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
function App() {
  

  return (
   <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          
          
        </Routes>
          
      </BrowserRouter>
   </>
   
  )
}

export default App
