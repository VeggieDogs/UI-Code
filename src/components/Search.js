import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Search.css';
import BackToHomeButton from './BackToHomeButton';

const Search = () => {
  const [query, setQuery] = useState(''); // Input for product name
  const [products, setProducts] = useState([]); // Fetched product data
  const [error, setError] = useState(''); // Error handling
  const navigate = useNavigate();

  // Function to handle searching for products by product name
  const handleSearch = () => {
    if (query.trim() === '') {
      setError('Please enter a product name to search.');
      return;
    }
    
    setError(''); // Clear previous errors

    // Send GET request to Flask backend with product_name as a query param
    axios.get(`http://98.84.2.170:8888/search_product?product_name=${query}`)
      .then((response) => {
        setProducts(response.data); // Populate products state with fetched data
        if (response.data.length === 0) {
          setError('No products found for the given name.');
        }
      })
      .catch((err) => {
        setError('Error fetching products.');
      });
  };

  const goToOrders = () => {
    navigate('/orders'); // Navigate to the orders page
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search Products</h1>
      
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter Product Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update input value
        />
        <button onClick={handleSearch}>Search</button>
        <button className="order-button" onClick={goToOrders}>Orders</button>
      </div>

      {/* Error Handling */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Products */}
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <Link to={`/product/${product.product_id}`} key={product.product_id} className="product-link">
              <div className="product-item">
                <h2>{product.product_name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
                {product.is_sold ? <p>Status: Sold</p> : <p>Status: Available</p>}
              </div>
            </Link>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      <BackToHomeButton />
    </div>
  );
};

export default Search;
