import React, { useState } from 'react';
import axios from 'axios';
import './SellerOrders.css';
import BackToHomeButton from './BackToHomeButton';

const SellerOrders = () => {
  const [orderId, setOrderId] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Number of orders to show per page

  // Fetch orders from the Flask backend using Order ID
  const handleSearch = () => {
    axios.get(`/search_order?order_id=${orderId}`)
      .then(response => {
        setOrders(response.data.orders || []);
        setError('');
        setCurrentPage(1); // Reset to first page on new search
      })
      .catch(err => {
        setError('No sales orders found');
      });
  };

  // Pagination controls
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginateOrders = () => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    return orders.slice(startIndex, endIndex);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
            {paginateOrders().length > 0 ? (
              paginateOrders().map((order, index) => (
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

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

      <BackToHomeButton />
    </div>
  );
};

export default SellerOrders;
