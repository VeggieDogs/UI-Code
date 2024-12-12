import React, { useState } from 'react';
import axios from 'axios';
import './Orders.css';
import BackToHomeButton from './BackToHomeButton';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/';

const Orders = () => {
  const [orderId, setOrderId] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination

  const handleSearch = () => {
    axios
      .get(`${COMPOSITE_API_BASE_URL}/orders?order_id=${orderId}`)
      .then((response) => {
        if (response.data && response.data.orders) {
            //console.log("API Response:", response.data.orders); // Debug: log the entire response
          setOrders(response.data.orders);
            //console.log("Orders state:", orders, orders.length); // Debug state updates
          setError('');
          setCurrentPage(1); // Reset to the first page on new search
        } else {
          setError('No orders found');
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching orders:", err); // Debug: log the error
        setError('No orders found');
        setOrders([]);
      });
  };

  // Pagination handlers
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

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

  // Calculate orders to display on the current page
  const currentOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
      {error && <p className="error-message">{error}</p>}
      
      {/* Orders Table */}
            {orders.length > 0 ? (
                <div>

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
                </div>
      ) : (
        !error && <p>No orders found</p>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {Math.max(totalPages, 1)}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      <BackToHomeButton />
    </div>
  );
};

export default Orders;
