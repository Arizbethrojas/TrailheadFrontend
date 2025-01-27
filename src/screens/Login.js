// src/screens/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin, setAuthToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting Form:', { username, password }); // Debugging line

    if (isLogin) {
      try{
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
          username,
          password,
        });
        const {access, refresh} = response.data;
        setAuthToken(access);
        console.log('login successful');
        onLogin();
        navigate('/trips');
      } catch(err) {
        console.error('Invalid username or password'); // Debugging line
        setError('Invalid username or password');
      }
    } else {
      // Placeholder for sign-up logic
      console.log('Sign Up:', { username, password });
      // Simulate a successful sign-up traversal
      navigate('/trips');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '8px' }}
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '8px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ marginTop: '20px' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p>
        {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
        <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: '5px', backgroundColor: 'transparent', border: 'none', color: 'blue', cursor: 'pointer' }}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Login;
