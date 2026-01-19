import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from './Body'
import Booking from './Booking'
import Header from './Header'
import Register from './Register'
import Login from './Login';
import Success from './Success';
import { AuthProvider } from "./context/AuthContext.jsx";
function App() {

  return (
    <>
    
      <BrowserRouter>
      <AuthProvider>
      <Header/>
      <Routes>
        <Route path='/' element={<Body/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/success' element={<Success/>}/>
      </Routes>
      </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
