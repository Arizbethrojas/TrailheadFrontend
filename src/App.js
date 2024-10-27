// src/App.js
import React from 'react';
import AddTrip from './screens/AddTrip'; // Import Add Trip screen
import Archive from './screens/Archive'; // Import Archive screen
import Chat from './screens/Chat'; // Import Chat screen
import Profile from './screens/Profile'; // Import Profile screen
import Trips from './screens/Trips'; // Import Trips screen
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// App Component
export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/trips">Trips</Link> {/* Ensure case matches */}
          </li>
          <li>
            <Link to="/archive">Archive</Link> {/* Ensure case matches */}
          </li>
          <li>
            <Link to="/add-trip">Add Trip</Link> {/* Add Trip link */}
          </li>
          <li>
            <Link to="/profile">Profile</Link> {/* Profile link */}
          </li>
          <li>
            <Link to="/chat">Chat</Link> {/* Chat link */}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/trips" element={<Trips />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/add-trip" element={<AddTrip />} /> {/* Add route for Add Trip */}
        <Route path="/profile" element={<Profile />} /> {/* Profile route */}
        <Route path="/chat" element={<Chat />} /> {/* Chat route */}
      </Routes>
    </Router>
  );
}