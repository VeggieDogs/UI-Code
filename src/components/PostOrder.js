import React, { useState } from 'react';
import axios from 'axios';
import './PostOrder.css';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/';

const PostOrder = () => {
  const [orderData, setOrderData] = useState({
    quantity: '',
    total_price: '',
    status: '',
    seller_id: '',
    buyer_id: '',
    product_id: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error
    setSuccessMessage(''); // Clear any previous success message

    try {
      const response = await axios.post(`${COMPOSITE_API_BASE_URL}/post_order`, orderData);

      if (response.status === 201) {
        // Handle success based on the backend response
        const { message } = response.data; // Extract message from the response
        setSuccessMessage(message || 'Order posted successfully'); // Display success message
      } else {
        // Handle unexpected non-201 responses
        setError('Unexpected response from the server.');
      }
    } catch (err) {
      // Handle network or server errors
      console.error('Error posting order:', err);
      setError('An error occurred while posting the order.');
    }
  };

  return (
    <div className="post-order-container">
      <h1>Post a New Order</h1>
      <form onSubmit={handleSubmit} className="post-order-form">
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={orderData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="total_price"
          placeholder="Total Price"
          value={orderData.total_price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={orderData.status}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="seller_id"
          placeholder="Seller ID"
          value={orderData.seller_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="buyer_id"
          placeholder="Buyer ID"
          value={orderData.buyer_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="product_id"
          placeholder="Product ID"
          value={orderData.product_id}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-order-button">Submit Order</button>
      </form>

      {/* Display success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PostOrder;
