import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Homepage.css';

const COMPOSITE_API_BASE_URL = 'http://localhost:8891/composite';

const Homepage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);  // Store items to display in the paginated list
  const [page, setPage] = useState(1);     // State for current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages (assume backend provides this)

  // Fetch paginated items from API when the page changes
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${COMPOSITE_API_BASE_URL}/items?page=${page}`);
        const data = await response.json();
        
        setItems(data.items || []);
        setTotalPages(data.totalPages || 1); // Assume API provides `totalPages`
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    
    fetchItems();
  }, [page]);

  const goToLogin = (action) => {
    navigate(`/login?type=${action}`);
  };

  const goToAdmin = () => {
    navigate("/admin");
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="homepage">
      <header className="header">
        <img src="/path/to/logo.png" alt="TradeNest Logo" />
        <h1>TradeNest</h1>
        <button className="admin-button" onClick={goToAdmin}>Administrator</button>
      </header>

      <div className="main-content">
        <Carousel className="carousel-container" showThumbs={false} autoPlay infiniteLoop>
          <div><img src="frontpage.png" alt="Item 1" /></div>
          <div><img src="frontpage2.png" alt="Item 2" /></div>
          <div><img src="frontpage3.png" alt="Item 3" /></div>
        </Carousel>

        <div className="welcome-message">
          <h2>Welcome to TradeNest!</h2>
          <p>Do you want to buy or sell?</p>
          <div className="button-group">
            <button onClick={() => goToLogin('buy')} className="buy-button">Buy</button>
            <button onClick={() => goToLogin('sell')} className="sell-button">Sell</button>
          </div>
        </div>

        {/* Paginated Items Section */}
        <div className="paginated-items">
          <h3>Explore Our Items</h3>
          <div className="items-list">
            {items.map(item => (
              <div key={item.id} className="item">
                <img src={item.image_url || "https://via.placeholder.com/150"} alt={item.name} />
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={prevPage} disabled={page === 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={nextPage} disabled={page === totalPages}>Next</button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>Copyright © 2024 TradeNest. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
