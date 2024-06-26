import React from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from 'react';
import logo from '../../assets/cibclogo2.png'; // Adjust the path based on your project structure

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const handleRegisterClick = () => {
    setIsRegister(true);
  };

  const handleLoginClick = () => {
    setIsRegister(false);
  };

  return (
    <div className="login-container">
      <div className="left-box">
        <div className='wrapper'>
        <img src={logo} alt="Company Logo" className="logo" />
          <form action ="">
            <h1>{isRegister ? 'Register' : 'Login'}</h1>
            <h1 className="title">Parent Portal</h1>
            <div className="input-box">
              <input type="text" placeholder='Username' required />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input type="password" placeholder='Password' required />
              <FaLock className='icon'/>
            </div>

            {isRegister && (
              <div className="input-box">
                <input type="password" placeholder='Confirm Password' required />
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

          </form>
        </div>

      </div>
      <div className="right-box"></div>
    </div>
  );
};

export default Login