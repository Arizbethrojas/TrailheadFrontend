import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin, setAuthToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!isLogin) {
      console.log("Navigating to Sign Up");
      navigate('/sign-up');
    }
  }, [isLogin, navigate]); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting Form:', { username, password });

    if (isLogin) {
      try {
        const response = await axios.post(`${apiUrl}/api/token/`, { username, password });
        console.log("response: ", response.data);
        const { access } = response.data;
        console.log('access', access);
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
    <div
      style={{
        backgroundImage: `url('/landingPage.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          width: '300px',
          textAlign: 'center'
        }}
      >
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
          <button onClick={() => setIsLogin(!isLogin)} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer', marginLeft: '5px' }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
