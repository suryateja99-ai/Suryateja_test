import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from './Body'
import Booking from './Booking'
import Header from './Header'
import Register from './Register'
import Login from './Login';
import Success from './Success';
function App() {

  return (
    <>
    
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Body/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/success' element={<Success/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
