// src/components/Login.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import BackToHomeButton from './BackToHomeButton'; // Import BackToHomeButton

const Login = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'buy') {
      navigate('/search');
    } else if (type === 'sell') {
      navigate('/seller-dashboard');
    }
  };

  return (
    <div className="login-container">
      <h1>{type === 'buy' ? 'Login to Buy' : 'Login to Sell'}</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Add Back to Home Button */}
      <BackToHomeButton />
    </div>
  );
};

export default Login;


