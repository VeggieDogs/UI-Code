import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css';
import BackToHomeButton from './BackToHomeButton';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/';
const ITEMS_PER_PAGE = 5; // Pagination limit for products and orders

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [currentOrderPage, setCurrentOrderPage] = useState(1);

  const fetchUserData = async () => {
    try {
      const query = userId
        ? `search_user_by_id?user_id=${userId}`
        : `search_user?username=${username}`;
      const response = await axios.get(`${COMPOSITE_API_BASE_URL}${query}`);
      if (response.data && response.data.users && response.data.users.length > 0) {
        setUserInfo(response.data.users[0]);
        setError('');
        return response.data.users[0].user_id; // Return user_id to fetch products and orders
      } else {
        setError('User not found.');
        return null;
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to fetch user information.');
      return null;
    }
  };

  const fetchProducts = async (userId) => {
    try {
      const response = await axios.get(`${COMPOSITE_API_BASE_URL}search_products_by_user_id?user_id=${userId}`);
      if (response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`${COMPOSITE_API_BASE_URL}search_orders_by_id?user_id=${userId}`);
      if (response.data && response.data.orders) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    }
  };

  const handleSearch = async () => {
    setError('');
    setUserInfo(null);
    setProducts([]);
    setOrders([]);
    setCurrentProductPage(1);
    setCurrentOrderPage(1);

    const fetchedUserId = await fetchUserData();
    if (fetchedUserId) {
      fetchProducts(fetchedUserId);
      fetchOrders(fetchedUserId);
    }
  };

  // Pagination logic
  const productTotalPages = Math.max(Math.ceil(products.length / ITEMS_PER_PAGE), 1);
  const orderTotalPages = Math.max(Math.ceil(orders.length / ITEMS_PER_PAGE), 1);

  const displayedProducts = products.slice(
    (currentProductPage - 1) * ITEMS_PER_PAGE,
    currentProductPage * ITEMS_PER_PAGE
  );
  const displayedOrders = orders.slice(
    (currentOrderPage - 1) * ITEMS_PER_PAGE,
    currentOrderPage * ITEMS_PER_PAGE
  );

  return (
    <div className="admin-container">
      <h1 className="search-title">Search User</h1>
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

      {error && <p className="error-message">{error}</p>}

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

      <div className="table-container">
        <h2>Products</h2>
        {displayedProducts.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.is_sold ? 'Sold' : 'Available'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products found</p>
        )}
        <div className="pagination-controls">
          <button onClick={() => setCurrentProductPage((prev) => prev - 1)} disabled={currentProductPage === 1}>
            Previous
          </button>
          <span>
            Page {currentProductPage} of {productTotalPages}
          </span>
          <button onClick={() => setCurrentProductPage((prev) => prev + 1)} disabled={currentProductPage === productTotalPages}>
            Next
          </button>
        </div>
      </div>

      <div className="table-container">
        <h2>Orders</h2>
        {displayedOrders.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Purchase Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.quantity}</td>
                  <td>{order.total_price}</td>
                  <td>{order.purchase_time}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found</p>
        )}
        <div className="pagination-controls">
          <button onClick={() => setCurrentOrderPage((prev) => prev - 1)} disabled={currentOrderPage === 1}>
            Previous
          </button>
          <span>
            Page {currentOrderPage} of {orderTotalPages}
          </span>
          <button onClick={() => setCurrentOrderPage((prev) => prev + 1)} disabled={currentOrderPage === orderTotalPages}>
            Next
          </button>
        </div>
      </div>

      <BackToHomeButton />
    </div>
  );
};

export default AdminPage;







