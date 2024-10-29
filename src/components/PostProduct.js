// src/components/PostProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostProduct.css';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/composite';

const PostProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    product_name: '',
    price: '',
    quantity: '',
    description: '',
    image_url: '',
    seller_id: '', // Let the user enter seller_id
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${COMPOSITE_API_BASE_URL}/post_product`, productData);
      if (response.status === 202) {
        alert('Product posted successfully!');
        navigate('/seller-dashboard', { state: { refresh: true } });
      } else {
        setError('Failed to post the product.');
      }
    } catch (err) {
      setError('An error occurred while posting the product.');
    }
  };

  return (
    <div className="post-product-container">
      <h1>Post a New Product</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="post-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={productData.product_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={productData.quantity}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={productData.image_url}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="seller_id"
          placeholder="Seller ID"
          value={productData.seller_id}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit Product</button>
      </form>
    </div>
  );
};

export default PostProduct;
