import React from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {


  function handleLogin(event){
    event.preventDefault();
  
    fetch('http://localhost:3001/api/testserver', {
      headers: {
        'Accept': 'application/json', // Specify that the client expects JSON
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(text => {
      try {
        //const jsonData = JSON.parse(text); // Attempt to parse JSON
        console.log(text);
        window.alert("API routing worked!!!1");
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        // Handle the case where response is not JSON
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
            <h1 className="title">Parent Portal</h1>
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

            <button type="submit" onClick={handleLogin}>Login</button>

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
