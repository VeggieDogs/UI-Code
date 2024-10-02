import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css'; // CSS file for styling the Admin page
import BackToHomeButton from './BackToHomeButton';

const AdminPage = () => {
  const [username, setUsername] = useState(''); // Input field for username
  const [users, setUsers] = useState([]); // Store the user details
  const [error, setError] = useState(''); // Error handling

  // Function to handle searching users by username
  const handleSearch = () => {
    if (username.trim() === '') {
      setError('Please enter a username.');
      return;
    }

    setError(''); // Clear any existing errors

    // Call the Flask API to search for users by username
    axios.get(`/search_user?username=${username}`)
      .then((response) => {
        setUsers(response.data); // Update the user state with the response
        if (response.data.length === 0) {
          setError('No users found for the given username.');
        }
      })
      .catch((err) => {
        setError('Error fetching users.');
      });
  };

  return (
    <div className="admin-container">
      <h1 className="search-title">Search Users</h1>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Error handling */}
      {error && <p className="error-message">{error}</p>}

      {/* User table */}
      {users.length > 0 && (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.address}</td>
                  <td>{user.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BackToHomeButton />
    </div>
  );
};

export default AdminPage;
