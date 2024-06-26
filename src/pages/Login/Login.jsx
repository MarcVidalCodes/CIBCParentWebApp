import React from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div className="login-container">
      <div className="left-box">
        {/* <div className="username-box">
            <label htmlFor="username"></label>
            <input type="text" id="username" name="username" placeholder="Enter your username" />
        </div> */}
        <div className='wrapper'>
          <form action ="">
            <h1>Login</h1>
            <h1 className="title">MoneyMentor</h1>
            <div className="input-box">
              <input type="text" placeholder='Username' required />
              <FaUser className='icon' />
            </div>
            <div className="input-box">
              <input type="password" placeholder='Password' required />
              <FaLock className='icon'/>
            </div>

            <div className="remember-forget">
              <label><input type="checkbox" />Remember me</label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Login</button>

            <div className="register-link">
              <p>Don't have an account? <a href="#">Register</a></p>
            </div>

          </form>
        </div>

      </div>
      <div className="right-box"></div>
    </div>
  );
};


export default Login
