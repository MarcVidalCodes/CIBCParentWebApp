import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import logo from '../../assets/cibclogo2.png'; // Adjust the path based on your project structure

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();

    if (isRegister && password !== confirmPassword) {
      window.alert('Passwords do not match');
      return;
    }

    const url = isRegister ? 'http://localhost:3001/api/users/signup' : 'http://localhost:3001/api/users/signin';
    const payload = {username, password, confirmPassword};

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(err.error); });
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        window.alert(data.error);
      } else {
        window.alert(isRegister ? `Registration successful! Token: ${data._id}` : `Login successful! Token: ${data._id}`);
        console.log(`Token: ${data._id}`); // Log the token for debug purposes
        // Store user information in local storage
        localStorage.setItem('userId', data._id);
        navigate('/dashboard'); // Redirect to dashboard
      }
    })
    .catch((error) => {
      console.log(error);
      window.alert(error.message);
    });
  }

  function handleRegisterClick(event) {
    event.preventDefault();
    setIsRegister(true);

    

  }

  function handleLoginClick(event) {
    event.preventDefault();
    setIsRegister(false);
  }

  return (
    <div className="login-container">
      <div className="left-box">
        <div className='wrapper'>
          <form action ="">
            <img src={logo} alt="Company Logo" className="logo" />
            <h1>{isRegister ? 'Register' : 'Login'}</h1>
            <h1 className="title">Parent Portal</h1>
            <div className="input-box">
              <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
              <FaLock className='icon'/>
            </div>

            {isRegister && (
              <div className="input-box">
                <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <FaLock className='icon'/>
              </div>
            )}

            <div className="remember-forget">
              {!isRegister && (
                <>
                  <label><input type="checkbox" />Remember me</label>
                  <a href="#">Forgot password?</a>
                </>
              )}
            </div>

            <button type="submit" onClick={handleLogin}>{isRegister ? 'Register' : 'Login'}</button>

            <div className="register-link">
              <p>{isRegister ? 'Already have an account?' : "Don't have an account?"} <a href="#" onClick={isRegister ? handleLoginClick : handleRegisterClick}>{isRegister ? 'Login' : 'Register'}</a></p>
            </div>

          </form>
        </div>

      </div>
      <div className="right-box"></div>
    </div>
  );
};

export default Login;
