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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (username, password) => {
    const response = await fetch('http://localhost:3001/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('jwtToken', data.token); // Save the token to local storage
      console.log('Token in Login:', data.token); // Debugging token value
      window.alert(`Login successful! Token: ${data.token}`);
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      setError('Invalid credentials');
      window.alert('Login failed: Invalid credentials');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (isRegister && password !== confirmPassword) {
      window.alert('Passwords do not match');
      return;
    }

    const url = isRegister ? 'http://localhost:3001/api/users/signup' : 'http://localhost:3001/api/users/signin';
    const payload = { username, password, confirmPassword };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      if (data.error) {
        window.alert(data.error);
      } else {
        localStorage.setItem('jwtToken', data.token); // Save the token to local storage
        console.log('Token in Login:', data.token); // Debugging token value
        window.alert(`Login successful! Token: ${data.token}`);
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      console.error('Error during login/register:', error);
      setError(error.message);
      window.alert(`Login/Register failed: ${error.message}`);
    }
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    setIsRegister(true);
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    setIsRegister(false);
  };

  return (
    <div className="login-container">
      <div className="left-box">
        <div className='wrapper'>
          <form onSubmit={handleLogin}>
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

            <button type="submit">{isRegister ? 'Register' : 'Login'}</button>

            <div className="register-link">
              <p>{isRegister ? 'Already have an account?' : "Don't have an account?"} <a href="#" onClick={isRegister ? handleLoginClick : handleRegisterClick}>{isRegister ? 'Login' : 'Register'}</a></p>
            </div>

            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
      <div className="right-box"></div>
    </div>
  );
};

export default Login;
