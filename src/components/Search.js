import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Search.css';
import BackToHomeButton from './BackToHomeButton';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/composite';

const Search = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() === '') {
      setError('Please enter a product name to search.');
      return;
    }

    setError('');

    axios.get(`${COMPOSITE_API_BASE_URL}/products?product_name=${query}`)
      .then((response) => {
        setProducts(response.data.products ? response.data.products[0] : []);
        if (response.data.products[0].length === 0) {
          setError('No products found for the given name.');
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Error fetching products.');
      });
  };

  const goToOrders = () => {
    navigate('/orders');
  };

  const goToPostOrder = () => {
    navigate('/post-order'); // Navigate to the Post Order page
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search Products</h1>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter Product Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button className="order-button" onClick={goToOrders}>Orders</button>
        <button className="post-order-button" onClick={goToPostOrder}>Post Order</button>
      </div>

      {error && <p className="error-message">{error}</p>}

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

