import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // Import AuthProvider
import Login from './pages/Login/Login';
import AiInsights from './pages/AiInsights/AiInsights';
import LoadFunds from './pages/LoadFunds/LoadFunds';
import ParentalControls from './pages/ParentalControls/ParentalControls';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/ai-insights' element={<PageWithNavbar><AiInsights /></PageWithNavbar>} />
          <Route path='/load-funds' element={<PageWithNavbar><LoadFunds /></PageWithNavbar>} />
          <Route path='/dashboard' element={<PageWithNavbar><Dashboard /></PageWithNavbar>} />
          <Route path='/parental-controls' element={<PageWithNavbar><ParentalControls /></PageWithNavbar>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

// Component to wrap pages with Navbar
const PageWithNavbar = ({ children }) => {
  const handleLogout = () => {
    window.location.href = '/'; // Navigate to the login page
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar onLogout={handleLogout} />
      <div style={{ marginLeft: '25%', width: '75%' }}>
        {children}
      </div>
    </div>
  );
};

export default App;
