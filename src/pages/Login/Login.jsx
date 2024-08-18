import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import logo from '../../assets/cibclogo2.png'; // Adjust the path based on your project structure

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const handleRegisterClick = () => {
    setIsRegister(true);
  };

  const handleLoginClick = () => {
    setIsRegister(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        await axios.post('http://localhost:3001/api/users/signup', {
          username,
          password,
        });
        setMessage('Registration successful');
        setError('');
        setTimeout(() => {
          navigate('/dashboard'); // Redirect to the dashboard after 3 seconds
        }, 3000); // 3 seconds delay
      } catch (error) {
        setError('Registration failed');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3001/api/users/signin', {
          username,
          password,
        });
        setMessage('Login successful');
        setError('');
        setTimeout(() => {
          navigate('/dashboard'); // Redirect to the dashboard after 3 seconds
        }, 1000); // 3 seconds delay
      } catch (error) {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="left-box">
        <div className='wrapper'>
          <form onSubmit={handleSubmit}>
            <img src={logo} alt="Company Logo" className="logo" />
            <h1>{isRegister ? 'Register' : 'Login'}</h1>
            <h1 className="title">Parent Portal</h1>
            <div className="input-box">
              <input 
                type="text" 
                placeholder='Username' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input 
                type="password" 
                placeholder='Password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <FaLock className='icon'/>
            </div>

            {isRegister && (
              <div className="input-box">
                <input 
                  type="password" 
                  placeholder='Confirm Password' 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
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

            {error && <div className="alert error">{error}</div>}
            {message && <div className="alert success">{message}</div>}

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
