import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Homepage.css'; // Custom CSS for styling

const Homepage = () => {
  const navigate = useNavigate();

  const goToLogin = (action) => {
    navigate(`/login?type=${action}`);
  };

  const goToAdmin = () => {
    navigate("/admin");
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
          {/* Example images */}
          <div><img src="https://via.placeholder.com/800x400" alt="Item 1" /></div>
          <div><img src="https://via.placeholder.com/800x400" alt="Item 2" /></div>
          <div><img src="https://via.placeholder.com/800x400" alt="Item 3" /></div>
        </Carousel>

        <div className="welcome-message">
          <h2>Welcome to TradeNest!</h2>
          <p>Do you want to buy or sell?</p>
          <div className="button-group">
            <button onClick={() => goToLogin('buy')} className="buy-button">Buy</button>
            <button onClick={() => goToLogin('sell')} className="sell-button">Sell</button>
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

