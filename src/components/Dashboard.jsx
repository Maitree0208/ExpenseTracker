import React from 'react';

function Dashboard({ user }) {
  return (
    <div>
      <h1>Welcome, {user.firstName} {user.lastName}</h1>
      {/* Other dashboard content can go here */}
      {/* <h1>Mayhiiiiii</h1> */}
    </div>
  );
}

export default Dashboard;
