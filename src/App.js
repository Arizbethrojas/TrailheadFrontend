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
        // Define what happens when the notification is clicked
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
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleNotification = () => {
    showNotification(title, body, icon);
  };

  return (
    <Router>
      <nav>
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
        </ul>
      </nav>

       {/* Test notification button, unhighlight to view an example of notifcations working */}
       {/* <button onClick={handleNotification}>Test Notification</button>  */}

      <Routes>
        <Route path="/" element={<Navigate to="/trips" replace />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/add-trip" element={<AddTrip />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/sign-up" element={<SignUpIndividual />} />     
      </Routes>
    </Router>
  );
};

export default App;