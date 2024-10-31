import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Search.css';
import BackToHomeButton from './BackToHomeButton';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/composite';
const ITEMS_PER_PAGE = 5; // Number of products per page

const Search = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (query.trim() === '') {
      setError('Please enter a product name to search.');
      return;
    }

    setError('');
    setCurrentPage(1); // Reset to the first page on a new search

    try {
      const response = await axios.get(`${COMPOSITE_API_BASE_URL}/products?product_name=${query}`);
      console.log('API Response:', response.data); // Log the response data to see its structure

      if (response.data && response.data.products) {
        const productList = Array.isArray(response.data.products[0]) ? response.data.products[0] : response.data.products;
        setProducts(productList);

        if (productList.length === 0) {
          setError('No products found for the given name.');
        }
      } else {
        setError('Unexpected response format.');
        console.warn('Unexpected response format:', response.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error fetching products.');
    }
  };

  const goToOrders = () => {
    navigate('/orders');
  };

  const goToPostOrder = () => {
    navigate('/post-order');
  };

  // Pagination calculations
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

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

  // Get products to display on the current page
  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
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
          !error && <p>No products found</p> // Only show if no error and no products
        )}
      </div>

      {/* Pagination Controls */}
      {products.length > ITEMS_PER_PAGE && (
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}

      <BackToHomeButton />
    </div>
  );
};

export default Search;
