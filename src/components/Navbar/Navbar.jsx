import React from 'react';
import { NavLink } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import './Navbar.css';
import logo from '../../assets/cibclogo1.png'; // Adjust the path based on your project structure

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo" />
        <div className="money-mentor">Parent Portal</div>
      </div>
      <ul>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/ai-insights">AI Insights</NavLink></li>
        <li><NavLink to="/load-funds">Load Funds</NavLink></li>
        <li><NavLink to="/parental-controls">Parental Controls</NavLink></li>
      </ul>
      <div className="logout-container" onClick={onLogout}>
        <CiLogout className="logout-icon" />
        <span className="logout-text">Logout</span>
      </div>
    </div>
  );
};

export default Navbar;

