import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/cibclogo1.png'; // Adjust the path based on your project structure

const Navbar = () => {
  return (
    <div className="navbar" style={{ width: '25%', backgroundColor: '#901C44' }}>
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo" />
      </div>
      <ul>
        <li><Link to="/accounts">Accounts</Link></li>
        <li><Link to="/load-funds">Load Funds</Link></li>
        <li><Link to="/parental-controls">Parental Controls</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
