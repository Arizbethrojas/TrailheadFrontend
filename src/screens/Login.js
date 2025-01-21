// src/screens/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const validUsername = 'dara21';
    const validPassword = 'trailhead';

    console.log('Submitting Form:', { username, password }); // Debugging line

    if (isLogin) {
      // Login logic
      if (username === validUsername && password === validPassword) {
        console.log('Login successful'); // Debugging line
        onLogin(); // Call onLogin to update the auth state
        navigate('/trips');
      } else {
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
