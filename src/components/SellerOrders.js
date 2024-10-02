import React, { useState } from 'react';
import axios from 'axios';
import './SellerOrders.css';
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from './BackToHomeButton';

const SellerOrders = () => {
  const [orderId, setOrderId] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch orders from the Flask backend using Order ID
  const handleSearch = () => {
    axios.get(`/search_order?order_id=${orderId}`) // Searching by order_id now
      .then(response => {
        setOrders(response.data.orders || []);
        setError('');
      })
      .catch(err => {
        setError('No sales orders found');
      });
  };

  return (
    <div className="seller-orders-container">
      <h1>Your Sales Orders</h1>
      
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display Error if any */}
      {error && <p className="error-message">{error}</p>}
      
      {/* Orders Table */}
      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.buyerName}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>${order.total_price}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No sales orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <BackToHomeButton />
    </div>
  );
};

export default SellerOrders;
