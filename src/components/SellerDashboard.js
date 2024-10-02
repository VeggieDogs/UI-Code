import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SellerDashboard.css';
import BackToHomeButton from './BackToHomeButton';

const SellerDashboard = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>Your Products</h1>
        <button 
          className="view-orders-button"
          onClick={() => navigate('/seller-orders')}
        >
          View Orders
        </button>
      </div>

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-link">
              <div className="product-item">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>
            </Link>
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


