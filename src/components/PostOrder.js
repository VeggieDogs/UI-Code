import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PostOrder.css';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/composite';

const PostOrder = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    quantity: '',
    total_price: '',
    status: '',
    seller_id: '',
    buyer_id: '',
    product_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${COMPOSITE_API_BASE_URL}/post_order`, orderData);
      if (response.status === 201) {
        alert('Order posted successfully');
        navigate('/orders'); // Redirect to the orders page after submission
      } else {
        alert('Failed to post order');
      }
    } catch (error) {
      console.error('Error posting order:', error);
      alert('An error occurred while posting the order');
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
    </div>
  );
};

export default PostOrder;
