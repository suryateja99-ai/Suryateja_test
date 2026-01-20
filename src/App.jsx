import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from './pages/Body'
import Booking from './pages/Booking'
import Header from './pages/Header'
import Register from './pages/Register'
import Login from './pages/Login';
import Success from './pages/Success';
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
