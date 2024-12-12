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
                <div class="login-container">
                    <h1>Welcome</h1>
                    <a href="http://localhost:5000/login" class="login-button">Login with Google</a>


      {/* Add Back to Home Button */}
      <BackToHomeButton />
    </div>
  );
};

export default Login;


