import { useState } from 'react';
import axios from 'axios';
import './Register.css';
import{useNavigate} from 'react-router-dom'

function Register() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const toLogin=()=>{
    navigate('/login')
  }

  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    special: false,
  });

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };
  };

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });

    if (name === 'password') {
      setPasswordRules(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid =
      passwordRules.length &&
      passwordRules.uppercase &&
      passwordRules.special;

    if (!isValid) {
      alert('Password does not meet requirements');
      return;
    }

    try {
       await axios.post('http://localhost:5000/users', userDetails);
      alert('Registration successful');
      setUserDetails({ email: '', password: '' });
      setPasswordRules({ length: false, uppercase: false, special: false });
    } catch (err) {
      if(err.response && err.response.status === 409){
        alert('email already exist')
      }
      console.log('form submission error:', err);
    }
  };

  return (
    <div className="reg-form">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={userDetails.email}
          onChange={handleChange}
          required
        />

        <div className="password-sec">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter password"
            value={userDetails.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={togglePassword}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <ul className="rules">
          <li className={passwordRules.length ? 'ok' : 'bad'}>
            Minimum 8 characters
          </li>
          <li className={passwordRules.uppercase ? 'ok' : 'bad'}>
            At least one uppercase letter
          </li>
          <li className={passwordRules.special ? 'ok' : 'bad'}>
            At least one special character
          </li>
        </ul>

        <button type="submit">Register</button>
      </form>
      <p>Alredy Registered?<button onClick={toLogin}>Login</button></p>
    </div>
  );
}

export default Register;
