import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css'; // CSS file for styling the Admin page
import BackToHomeButton from './BackToHomeButton';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/composite';

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  // Pagination states for products
  const [productPage, setProductPage] = useState(1);
  const productsPerPage = 5;
  const productIndexLast = productPage * productsPerPage;
  const productIndexFirst = productIndexLast - productsPerPage;
  const currentProducts = products.slice(productIndexFirst, productIndexLast);

  // Pagination states for orders
  const [orderPage, setOrderPage] = useState(1);
  const ordersPerPage = 5;
  const orderIndexLast = orderPage * ordersPerPage;
  const orderIndexFirst = orderIndexLast - ordersPerPage;
  const currentOrders = orders.slice(orderIndexFirst, orderIndexLast);

  const handleSearch = () => {
    if (username.trim() === '' && userId.trim() === '') {
      setError('Please enter a username or user ID.');
      return;
    }

    setError('');
    setUserInfo(null);
    setProducts([]);
    setOrders([]);
    setProductPage(1); // Reset pagination
    setOrderPage(1);

    axios.get(`${COMPOSITE_API_BASE_URL}/all?user_id=${userId || username}`)
      .then((response) => {
        const data = response.data;
        
        if (data.users && data.users.length > 0) {
          setUserInfo(data.users[0]);
        } else {
          setError('No user found with the given information.');
        }

        setProducts(data.products || []);
        setOrders(data.orders || []);
      })
      .catch(() => setError('Error fetching information.'));
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
              {currentProducts.map(product => (
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

          {/* Product Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={() => setProductPage(productPage - 1)} disabled={productPage === 1}>Previous</button>
            <span>Page {productPage} of {Math.ceil(products.length / productsPerPage)}</span>
            <button onClick={() => setProductPage(productPage + 1)} disabled={productPage === Math.ceil(products.length / productsPerPage)}>Next</button>
          </div>
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
              {currentOrders.map(order => (
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

          {/* Order Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={() => setOrderPage(orderPage - 1)} disabled={orderPage === 1}>Previous</button>
            <span>Page {orderPage} of {Math.ceil(orders.length / ordersPerPage)}</span>
            <button onClick={() => setOrderPage(orderPage + 1)} disabled={orderPage === Math.ceil(orders.length / ordersPerPage)}>Next</button>
          </div>
        </div>
      )}

      <BackToHomeButton />
    </div>
  );
};

export default AdminPage;

