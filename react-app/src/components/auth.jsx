// UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('/user');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserDashboard;
