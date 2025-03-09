// src/App.js
import React, { useEffect, useState } from 'react';
import AddTrip from './screens/AddTrip';
import Login from './screens/Login';
import Archive from './screens/Archive';
import Profile from './screens/Profile';
import Trips from './screens/Trips';
import Chat from './screens/Chat';
import SignUpIndividual from './screens/SignUp'; 
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import TripList from './screens/TripList';
import './App.css';
import axios from 'axios';
import Map from './components/map'; 


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isTripLeader, setTripLeader] = useState(null);
  const [currentRoute, setCurrentRoute] = useState('/'); // Track the current route
  const apiUrl = process.env.REACT_APP_API_URL;


  //store the current userID to be used by other screens
  const fetchStudentProfile = async () => {
    if (!authToken) {
      console.log("No auth token available");
      return;
    }

    try {
      console.log("Making profile request with token:", authToken);
      const response = await axios.get(`${apiUrl}/api/student/current/`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.id){
        console.log('app.js user data: ', response.data);
        setUserID(response.data.id);
        setUserName(response.data.student_name);
        setTripLeader(response.data.is_trip_leader);
        return response.data.id;
      }
    }catch{
      console.log("could not fetch user data");
    }

  }

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
        window.open('https://example.com');
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


  const handleLogin = (token) => {
    console.log('handling login with toke: ', token);
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  // Check authentication status on app load
  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
      fetchStudentProfile();
    }

    const handleRouteChange = (path) => {
      setCurrentRoute(path);
    };

  }, [authToken]);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && currentRoute !== '/login' && (
          <nav className="sidebar">
            <img src="/Logo.png" alt="Logo" className="logo" />
            <img src="/Dashed1.png" alt="" className="dashed-line" id="dashed1" />
            <img src="/Dashed.png" alt="" className="dashed-line" id="dashed2" />
            <ul>
              <li>
                <Link to="/trips">
                  <img src="/homeIcon.png" alt="Explore" className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/archive">
                  <img src="/archiveIcon.png" alt="Archive" className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <img src="/profileIcon.png" alt="Profile" className="icon" />
                </Link>
              </li>
              {isTripLeader && (
                <li>
                <Link to="/add-trip">
                  <img src="/addIcon.png" alt="Add" className="icon" />
                </Link>
              </li>
              )}
              <li>
                <Link to="/chat">
                  <img src="/chatIcon.png" alt="Chat" className="icon" />
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
            <Route path="/trips" element={isAuthenticated ? <Trips authToken={authToken} userID={userID}/> : <Navigate to="/login" />} />
            <Route path="/archive" element={isAuthenticated ? <Archive authToken={authToken} userID={userID}/> : <Navigate to="/login" />} />
            <Route path="/add-trip" element={isAuthenticated && isTripLeader? <AddTrip onTripCreated={handleFavSubclub} authToken={authToken} userID={userID} userName={userName}/> : <Navigate to="/trips" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile authToken={authToken} /> : <Navigate to="/login" />} />
            <Route path="/chat" element={isAuthenticated ? <Chat authToken={authToken} user={{ username: userName, authToken: authToken }} /> : <Navigate to="/login" />} />
            <Route path="/sign-up" element={<SignUpIndividual onSignUp={handleLogin} setAuthToken={setAuthToken}/>} />
            <Route path="/explore-trips" element={isAuthenticated ? <TripList /> : <Navigate to="/login" />} />
            <Route path="/map" element={<Map/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};



export default App;