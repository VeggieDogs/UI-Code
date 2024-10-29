import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SellerDashboard.css';
import BackToHomeButton from './BackToHomeButton';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/composite';

const SellerDashboard = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Memoize fetchProducts with useCallback to prevent redefinition on each render
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${COMPOSITE_API_BASE_URL}/products?user_id=${sellerId}`);
      console.log('API Response:', response.data); // Debugging: Log the response

      if (response.status === 200 && response.data.products && response.data.products[0]) {
        setProducts(response.data.products[0]); // Update with actual data structure if different
      } else {
        console.warn('No products found in response.');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [sellerId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

      <BackToHomeButton />
    </div>
  );
};

export default SellerDashboard;






