import {useState} from 'react';
import axios from 'axios'
import './Login.css';
import {useNavigate} from 'react-router-dom';


function Login(){
const[userD, setUserD]=useState({
    email:'',
    password:'',
})
const navigate = useNavigate();

const[showPassword, setShowPassword]=useState(false)

const handleChange=(e)=>{
    setUserD({...userD, [e.target.name]:e.target.value})
}

const tooglePassword=()=>{
    setShowPassword(prev=>!prev)
}

const handleSubmit=async(e)=>{
   e.preventDefault()
   try{
    const res= await axios.post('http://localhost:5000/login', userD)
   localStorage.setItem('token', res.data.token)
   localStorage.setItem('username', res.data.user.name);
   alert('login successful')
   navigate('/');

   setUserD({email:'',password:''});
   }catch(err){
    alert('Invalid username or password');
   }
}
return(
    <div className='login-form'>
        <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Enter user name' value={userD.email} name='email' onChange={handleChange}/>
            <div className='password-sec'>
                <input type={showPassword ?'text':'password'} placeholder='Enter password' value={userD.password} name='password' onChange={handleChange}/>
                <button type="button" onClick={tooglePassword}>{showPassword ? 'hide':'unhide'}</button>
            </div>
            <button type='submit'>Login</button>
        </form>
    </div>

)
}
export default Login;