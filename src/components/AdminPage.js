import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css'; // CSS file for styling the Admin page
import BackToHomeButton from './BackToHomeButton';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/';
const ITEMS_PER_PAGE = 5; // Number of users per page

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    if (username.trim() === '' && userId.trim() === '') {
      setError('Please enter a username or user ID.');
      return;
    }

    setError('');
    setUserInfo([]);
    setCurrentPage(1); // Reset to the first page on a new search

    axios
      .get(`${COMPOSITE_API_BASE_URL}/all?${userId ? `user_id=${userId}` : `username=${username}`}`)
      .then((response) => {
        const data = response.data;

        if (data.users && data.users.length > 0) {
          setUserInfo(data.users);
        } else {
          setError('No user found with the given information.');
        }
      })
      .catch(() => setError('Error fetching user information.'));
  };

  // Pagination calculations
  const totalPages = Math.ceil(userInfo.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get users to display on the current page
  const currentUsers = userInfo.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Error handling */}
      {error && <p className="error-message">{error}</p>}

      {/* User Info Section */}
      {currentUsers.length > 0 ? (
        <div className="table-container">
          <h2>User Information</h2>
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
              {currentUsers.map((user, index) => (
                <tr key={index}>
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
      ) : (
        <p>No users found</p>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
          Next
        </button>
      </div>

      <BackToHomeButton />
    </div>
  );
};

export default AdminPage;




