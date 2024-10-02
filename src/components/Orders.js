import React, { useState } from 'react';
import axios from 'axios';
import './Orders.css';  // Assuming the CSS file is saved as Orders.css
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from './BackToHomeButton';

const Orders = () => {
  const [orderId, setOrderId] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    axios.get(`http://54.157.229.55:8888/search_order?order_id=${orderId}`)
      .then(response => {
        setOrders(response.data.orders);
        setError('');
      })
      .catch(err => {
        setError('No orders found');
        setOrders([]);
      });
  };

  return (
    <div className="center-container">
      <h1 className="search-title">Search Orders</h1>
      
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
      {error && <p>{error}</p>}
      
      {/* Orders Table */}
      <div className="table-container">
        <table className="order-table">
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
            {orders.map((order, index) => (
              <tr key={index}>
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

            //for testing purposes, added by Youzhi
<div>{JSON.stringify(orders)}</div>

      <BackToHomeButton />
    </div>
  );
};

export default Orders;
