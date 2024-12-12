import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductPage.css';
import BackToHomeButton from './BackToHomeButton';

const ProductPage = ({ products }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Customize this to show more or fewer items per page

  // Get the index range for the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Find the product based on productId in the URL, if applicable
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const goToProductListing = () => {
    navigate('/seller-dashboard');
  };

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {Math.ceil(products.length / itemsPerPage)}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(products.length / itemsPerPage)}>
          Next
        </button>
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


