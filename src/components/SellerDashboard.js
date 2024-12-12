import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SellerDashboard.css';
import BackToHomeButton from './BackToHomeButton';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/';
const ITEMS_PER_PAGE = 5; // Define how many items per page

const SellerDashboard = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Memoize fetchProducts with useCallback to prevent redefinition on each render
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${COMPOSITE_API_BASE_URL}/products?user_id=${sellerId}`);
      console.log('API Response:', response.data); // Debugging: Log the response

      if (response.status === 200 && response.data.products && response.data.products[0]) {
        const allProducts = response.data.products[0];
        setProducts(allProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)); // Load current page products
        setTotalPages(Math.ceil(allProducts.length / ITEMS_PER_PAGE)); // Calculate total pages
      } else {
        console.warn('No products found in response.');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [sellerId, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, currentPage]);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${COMPOSITE_API_BASE_URL}/delete_product?product_id=${productId}`);
      if (response.status === 200) {
        alert('Product deleted successfully');
        fetchProducts(); // Refresh the product list after deletion
      } else {
        alert('Failed to delete the product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product');
    }
  };

  // Pagination control functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>Your Products</h1>
        
        <div className="dashboard-buttons">
          <button 
            className="post-product-button"
            onClick={() => navigate('/post-product', { state: { sellerId } })}
          >
            Post Product
          </button>
          <button 
            className="view-orders-button"
            onClick={() => navigate('/seller-orders')}
          >
            View Orders
          </button>
        </div>
      </div>

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} className="product-item">
              <Link to={`/product/${product.product_id}`} className="product-link">
                <div className="product-info">
                  <h2>{product.product_name}</h2>
                  <p>{product.description}</p>
                </div>
              </Link>
              <button
                className="delete-product-button"
                onClick={() => deleteProduct(product.product_id)}
              >
                Delete Product
              </button>
            </div>
          ))
        ) : (
          <p>You have no products listed</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

      <BackToHomeButton />
    </div>
  );
};

export default SellerDashboard;







