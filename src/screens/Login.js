// src/screens/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'; 
const Login = ({ onLogin, setAuthToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting Form:', { username, password });

    if (isLogin) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
          username,
          password,
        });
        const { access, refresh } = response.data;
        console.log('login successful');
        onLogin(access); // Pass the access token to App.js handleLogin
        navigate('/trips');
      } catch (err) {
        console.error('Invalid username or password');
        setError('Invalid username or password');
      }
    } else {
      // Placeholder for sign-up logic
      console.log('Sign Up:', { username, password });
      navigate('/trips');
    }
};

  return (
    <div className="login-container">
      <h1 className="login-title">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p className="toggle-form">
        {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
        <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Login;