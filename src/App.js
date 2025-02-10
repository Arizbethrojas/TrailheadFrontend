// src/App.js
import React, { useEffect, useState } from 'react';
import AddTrip from './screens/AddTrip';
import Login from './screens/Login'; // Import Login component
import Archive from './screens/Archive';
import Profile from './screens/Profile';
import Trips from './screens/Trips';
import SignUpIndividual from './screens/SignUp'; 
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import TripList from './screens/TripList';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state
  const [authToken, setAuthToken] = useState(null);

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const showNotification = (title, body, icon) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body: body,
        icon: icon,
      });
      
      notification.onclick = () => {
        console.log('Notification clicked');
        window.open('https://example.com'); // Replace with your URL
      };
    } else {
      console.log('Notification permission not granted. Cannot show notification.');
    }
  };

  const handleFavSubclub = (trip) => {
    console.log('subclub: ', typeof(trip.subclub));
    if (trip.subclub === 1 || trip.subclub === 'VHOC') {
      console.log('notification');
      const notificationTitle = `A new VHOC trip was posted!`;
      const notificationBody = `${trip.trip_name}`;
      showNotification(notificationTitle, notificationBody, null);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []); 

  const handleLogin = () => {
    setIsAuthenticated(true); // Set authentication state to true
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Set authentication state to false
  };

  return (
    <Router>
      <div className="app-container">
        {/* Render the navigation bar only if the user is authenticated */}
        {isAuthenticated && (
          <nav className="sidebar">
            <img src="/Logo.png" alt="Logo" className="logo" />
            <img src="/Dashed1.png" alt="" className="dashed-line" id="dashed1" />
            <img src="/Dashed.png" alt="" className="dashed-line" id="dashed2" />
            <ul>
              <li>
                <Link to="/trips">
                  <img src="/Map.png" alt="Explore" className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/archive">
                  <img src="/Archive.png" alt="Archive" className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <img src="/Profile.png" alt="Profile" className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/add-trip">
                  <img src="/Add.png" alt="Add" className="icon" />
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </nav>
        )}
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login onLogin={handleLogin} setAuthToken={setAuthToken}/>} />
            <Route path="/trips" element={isAuthenticated ? <Trips authToken={authToken}/> : <Navigate to="/login" />} />
            <Route path="/archive" element={isAuthenticated ? <Archive authToken={authToken}/> : <Navigate to="/login" />} />
            <Route path="/add-trip" element={isAuthenticated ? <AddTrip onTripCreated={handleFavSubclub} authToken={authToken}/> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/sign-up" element={<SignUpIndividual onSignUp={handleLogin} setAuthToken={setAuthToken}/>} />
            <Route path="/explore-trips" element={isAuthenticated ? <TripList /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
