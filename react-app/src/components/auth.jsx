// import React, { useState, useEffect } from 'react';

// function UserDashboard() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Make an HTTP request to the Flask backend to get user information
//     fetch('/getuser')
//       .then((response) => response.json())
//       .then((data) => {
//         // Set the user information in your React component's state
//         setUser(data.user);
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

//   return (
//     <div className="UserDashboard">
//       {user ? (
//         <div>
//           <p>Welcome, {user.username}!</p>
//           {/* Render other user-related information */}
//         </div>
//       ) : (
//         <p>Loading user information...</p>
//       )}
//     </div>
//   );
// }

// export default UserDashboard;

import React, { useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
  useEffect(() => {
    // Make a GET request to your Flask server
    axios.get('http://127.0.0.1:5000/getuser')
      .then(response => {
        // Log the JSON response
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="UserDashboard">
      {/* Your React component content */}
    </div>
  );
}

export default UserDashboard;
