import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css'; // CSS file for styling the Admin page
import BackToHomeButton from './BackToHomeButton';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/composite';

const AdminPage = () => {
  const [username, setUsername] = useState(''); // Input field for username
  const [userId, setUserId] = useState(''); // Input field for user ID
  const [userInfo, setUserInfo] = useState(null); // Store user information
  const [products, setProducts] = useState([]); // Store products associated with the user
  const [orders, setOrders] = useState([]); // Store orders associated with the user
  const [error, setError] = useState(''); // Error handling

  // Function to handle searching users by username or user ID
  const handleSearch = () => {
    if (username.trim() === '' && userId.trim() === '') {
      setError('Please enter a username or user ID.');
      return;
    }

    setError(''); // Clear any existing errors

    // Determine the search parameter
    const searchParam = username ? `username=${username}` : `user_id=${userId}`;

    // Reset previous data
    setUserInfo(null);
    setProducts([]);
    setOrders([]);

    // Fetch user info
    axios.get(`${COMPOSITE_API_BASE_URL}/users?${searchParam}`)
      .then((response) => {
        const usersData = response.data.users || [];
        if (usersData.length === 0) {
          setError('No user found with the given information.');
        } else {
          setUserInfo(usersData[0]); // Assuming the first match
        }
      })
      .catch(() => setError('Error fetching user information.'));

    // Fetch products associated with the user ID
    if (userId) {
      axios.get(`${COMPOSITE_API_BASE_URL}/products?user_id=${userId}`)
        .then((response) => {
          setProducts(response.data.products || []);
        })
        .catch(() => setError('Error fetching user products.'));
      
      // Fetch orders associated with the user ID
      axios.get(`${COMPOSITE_API_BASE_URL}/orders?user_id=${userId}`)
        .then((response) => {
          setOrders(response.data.orders || []);
        })
        .catch(() => setError('Error fetching user orders.'));
    }
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
      {userInfo && (
        <div className="table-container">
          <h2>User Information</h2>
          <table className="user-table">
            <tbody>
              <tr><td>User ID</td><td>{userInfo.user_id}</td></tr>
              <tr><td>Username</td><td>{userInfo.username}</td></tr>
              <tr><td>Email</td><td>{userInfo.email}</td></tr>
              <tr><td>First Name</td><td>{userInfo.first_name}</td></tr>
              <tr><td>Last Name</td><td>{userInfo.last_name}</td></tr>
              <tr><td>Phone Number</td><td>{userInfo.phone_number}</td></tr>
              <tr><td>Address</td><td>{userInfo.address}</td></tr>
              <tr><td>Created At</td><td>{userInfo.created_at}</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Products Section */}
      {products.length > 0 && (
        <div className="table-container">
          <h2>Products</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.is_sold ? "Sold" : "Available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Section */}
      {orders.length > 0 && (
        <div className="table-container">
          <h2>Orders</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Purchase Time</th>
                <th>Status</th>
                <th>Seller ID</th>
                <th>Buyer ID</th>
                <th>Product ID</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.quantity}</td>
                  <td>{order.total_price}</td>
                  <td>{order.purchase_time}</td>
                  <td>{order.status}</td>
                  <td>{order.seller_id}</td>
                  <td>{order.buyer_id}</td>
                  <td>{order.product_id}</td>
                  <td>{order.created_at}</td>
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

