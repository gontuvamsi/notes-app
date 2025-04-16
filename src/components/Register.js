import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../auth';
import './Register.css';

function Register({ setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      register(username, email, password);
      setCurrentUser(username);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" "
            id="username"
            required
          />
          <label htmlFor="username">Username</label>
        </div>
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
        <button type="submit" className="register-btn">
          Register
        </button>
        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}

export default Register;