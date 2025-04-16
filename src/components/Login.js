import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth';
import './Login.css';

function Login({ setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }

    try {
      const username = login(email, password);
      setCurrentUser(username);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            id="email"
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            id="password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <div className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </form>
    </div>
  );
}

export default Login;