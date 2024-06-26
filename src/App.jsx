import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Accounts from './pages/Accounts/Accounts';
import LoadFunds from './pages/LoadFunds/LoadFunds';
import ParentalControls from './pages/ParentalControls/ParentalControls';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/accounts' element={<PageWithNavbar><Accounts /></PageWithNavbar>} />
        <Route path='/load-funds' element={<PageWithNavbar><LoadFunds /></PageWithNavbar>} />
        <Route path='/dashboard' element={<PageWithNavbar><Dashboard /></PageWithNavbar>} />
        <Route path='/parental-controls' element={<PageWithNavbar><ParentalControls /></PageWithNavbar>} />
      </Routes>
    </BrowserRouter>
  );
};

// Component to wrap pages with Navbar
const PageWithNavbar = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ marginLeft: '25%', width: '75%' }}>
        {children}
      </div>
    </div>
  );
};

export default App;
