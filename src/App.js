// src/App.js
import React, { useEffect, useState } from 'react';
import AddTrip from './screens/AddTrip';
import Archive from './screens/Archive';
import Chat from './screens/Chat';
import Profile from './screens/Profile';
import Trips from './screens/Trips';
import SignUpIndividual from './screens/SignUp'; 
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import TripExplore from './components/getTrips'; 
import sendTripData from './components/SendTrips';
import TripList from './screens/TripList';
import './App.css';

const App = () => {
  const [title, setTitle] = useState('Testing Notification');
  const [body, setBody] = useState('This is a test notification to verify that it works!');
  const [icon, setIcon] = useState('/icon.png');

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

  // Request notification permission when the app initializes
  useEffect(() => {
    requestNotificationPermission();
  }, []); 

  const handleNotification = () => {
    showNotification(title, body, icon);
  };

  return (
    <Router>
      <div className = "app-container">
        <nav className="sidebar">
          <img src="/Logo.png" alt="Logo" className="logo" />
          <img src="/Dashed1.png" alt="" className="dashed-line" id="dashed1"/>
          <img src="/Dashed.png" alt="" className="dashed-line" id="dashed2"/>

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
              <img src="/Notification.png" alt="Notifications" className="icon" />
            </li>
            <li><Link to="/add-trip">Add Trip</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            <li><Link to="/sign-up">Sign Up</Link></li>
            <li><Link to="/explore-trips">Explore Trips</Link></li>
          </ul>
        </nav>
      {/* <nav>
        <ul>
          <li>
            <Link to="/trips">Trips</Link>
          </li>
          <li>
            <Link to="/archive">Archive</Link>
          </li>
          <li>
            <Link to="/add-trip">Add Trip</Link> 
          </li>
          <li>
            <Link to="/profile">Profile</Link> 
          </li>
          <li>
            <Link to="/chat">Chat</Link> 
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link> 
          </li>
          <li>
            <Link to="/explore-trips">Explore Trips</Link> 
          </li>
        </ul>
      </nav> */}

      {/* Test notification button */}
      {/* <button onClick={handleNotification}>Test Notification</button> */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/trips" replace />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/add-trip" element={<AddTrip />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/sign-up" element={<SignUpIndividual />} />
            <Route path="/explore-trips" element={<TripList />} /> {/* Route for TripList */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
