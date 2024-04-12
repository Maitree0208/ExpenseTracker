import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    console.log("manish ", userData);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/login" element={<AuthForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard user={user} /> : <AuthForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/" element={isLoggedIn ? <Dashboard user={user} /> : <AuthForm onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    </Router>
  );
}

export default App;
