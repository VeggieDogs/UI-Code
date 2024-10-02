// src/components/ProductPage.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductPage.css';
import BackToHomeButton from './BackToHomeButton';

const ProductPage = ({ products }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const goToProductListing = () => {
    navigate('/seller-dashboard'); // Adjust path for product listing page
  };

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Left Side - Product Image */}
        <div className="product-images">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>

        {/* Right Side - Product Details */}
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">Price: $[Placeholder]</p>
          <p className="product-condition">Condition: [Placeholder]</p>
          <p className="product-description">{product.description}</p>

          <div className="product-actions">
            <button className="buy-now-button">Buy Now</button>
            <button className="add-to-watchlist-button">Add to Watchlist</button>
          </div>

          <div className="shipping-info">
            <p>Shipping: [Placeholder for shipping info]</p>
            <p>Delivery: [Placeholder for delivery info]</p>
          </div>
        </div>
      </div>

      {/* Back to Product Listing and Back to Home Buttons */}
      <div className="back-buttons-container">
        <button onClick={goToProductListing} className="back-to-product-listing-button">
          Back to Product Listing
        </button>
        <BackToHomeButton />
      </div>
    </div>
  );
};

export default ProductPage;


