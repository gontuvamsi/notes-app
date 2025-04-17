import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = ({ setCurrentUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Handle input changes and validate in real-time
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  // Validate individual field
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === 'username') {
      if (!value) newErrors.username = 'Username is required';
      else if (value.length < 3 || value.length > 20) newErrors.username = 'Username must be 3-20 characters';
      else delete newErrors.username;
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) newErrors.email = 'Email is required';
      else if (!emailRegex.test(value)) newErrors.email = 'Invalid email format';
      else {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some((user) => user.email === value)) newErrors.email = 'Email already exists';
        else delete newErrors.email;
      }
    }

    if (name === 'password') {
      if (!value) newErrors.password = 'Password is required';
      else if (value.length < 6) newErrors.password = 'Password must be at least 6 characters';
      else delete newErrors.password;
    }

    if (name === 'confirmPassword') {
      if (!value) newErrors.confirmPassword = 'Confirm password is required';
      else if (value !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  // Check if form is valid
  const isFormValid = () => {
    const { username, email, password, confirmPassword } = formData;
    const noErrors = Object.keys(errors).length === 0;
    const allFilled = username && email && password && confirmPassword;
    return noErrors && allFilled;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Final validation
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    setTouched({ username: true, email: true, password: true, confirmPassword: true });

    if (!isFormValid()) return;

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ username, email, password: password });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', username);
      setCurrentUser(username);
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {errors.general && <div className="error">{errors.general}</div>}

        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder=" "
            value={formData.username}
            onChange={handleChange}
          />
          <label>Username</label>
          {touched.username && errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
          />
          <label>Email</label>
          {touched.email && errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
          />
          <label>Password</label>
          {touched.password && errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder=" "
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <label>Confirm Password</label>
          {touched.confirmPassword && errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="register-btn" disabled={!isFormValid()}>
          Register
        </button>

        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;