
import Navbar from './layouts/Navbar/Navbar';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  

  return (
   <>
      <BrowserRouter>
          <Navbar></Navbar>
          <Home></Home>
      </BrowserRouter>
   </>
   
  )
}

export default App
