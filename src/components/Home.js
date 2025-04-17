import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to Notes App</h1>
        <p>Create and manage your notes with ease.</p>
        <div className="home-buttons">
          <Link to="/login" className="home-btn" aria-label="Go to login page">
            Login
          </Link>
          <Link to="/register" className="home-btn" aria-label="Go to register page">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;