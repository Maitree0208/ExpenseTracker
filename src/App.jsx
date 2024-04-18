import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Report_Bar from './components/Report_Bar';
import AddWalletComponent from './components/AddWallets';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    console.log("Logged in", userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/login" element={<AuthForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard user={user} /> : <AuthForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/reports" element={<Report_Bar />} /> 
        <Route path="/" element={isLoggedIn ? <Dashboard user={user} /> : <AuthForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/accounts" element={isLoggedIn ? <AddWalletComponent email={user.email}/> : <AddWalletComponent email={null}/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
