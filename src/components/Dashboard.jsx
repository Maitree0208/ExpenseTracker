// Dashboard.js
import React from 'react';
import './Dashboard.css';
import Tabs_Expense from './Tabs_Expense';

function Dashboard({ user }) {
  return (
    <div className="Dashboard-container">
      <h1 className="Dashboard-heading">Welcome, {user.firstName} {user.lastName}</h1>
      <Tabs_Expense></Tabs_Expense>
    </div>
  );
}

export default Dashboard;
