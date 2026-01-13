import './Header.css';
import {useNavigate, useLocation} from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const isHomepage = location.pathname==='/';
    const isRegpage =location.pathname==='/register'
    const isLogpage = location.pathname==='/login';
    const isLoggedIn = !!localStorage.getItem('token')

    const logout=()=>{
      localStorage.removeItem('token')
      navigate('/login')
    }

    const toHome =()=>{
        navigate('/')
    }

    const toReg=()=>{
      navigate('/register')
    }

    const toLogin=()=>{
    navigate('/login')
  }
  return (
    <header className="header">
      Sports Booking System
      <div className='home'>
        <button onClick={toHome} disabled={isHomepage}>Home</button>
      </div>
      {!isLoggedIn  &&(
        <>
        <div className='register'>
        <button onClick={toReg} disabled={isRegpage}>Register</button>
      </div>
      <div className='login'>
        <button onClick={toLogin} disabled={isLogpage}>Login</button>
      </div>
        </>
      )
      }

      {isLoggedIn &&(
        <div className='logout'>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
}

export default Header;
