import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin, setAuthToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      console.log("Navigating to Sign Up");
      navigate('/sign-up');
    }
  }, [isLogin, navigate]); // Navigate when `isLogin` changes

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting Form:', { username, password });

    if (isLogin) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
        console.log("response: ", response.data);
        const { access } = response.data;
        console.log('access', access);
        // setAuthToken(access);
        console.log('Login successful');
        onLogin(access);
        navigate('/trips');
      } catch (err) {
        console.log(err);
        console.error('Invalid username or password');
        setError('Invalid username or password');
      }
    }
};

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div style={{ marginTop: '16px' }}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ marginTop: '20px' }}>{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
        <button onClick={() => setIsLogin(false)} style={{ marginLeft: '5px', backgroundColor: 'transparent', border: 'none', color: 'blue', cursor: 'pointer' }}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Login;
