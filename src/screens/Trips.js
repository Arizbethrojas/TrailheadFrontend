// src/screens/Trips.js
import React from 'react';
import '../styles/globalStyles.css'; // Import global styles
import TripCard from '../components/TripCard'; // Import the TripCard component

const tripsData = [
  { title: "Trip 1", date: "10/16" },
  { title: "Trip 2", date: "10/16" },
  { title: "Trip 3", date: "10/16" },
  { title: "Trip 4", date: "10/16" },
];

const Trips = () => {
  return (
    <div className="trips-container">
      <div className="header">
        <h1>Dartmouth Outing Club Trips</h1>
        <div className="icons">
          <span className="bell">🔔</span> {/* Notification icon */}
          <img src="path-to-your-profile-image" alt="Profile" className="profile-pic" />
        </div>
      </div>
      
      <div className="past-trips">
        {tripsData.map((trip, index) => (
          <TripCard key={index} title={trip.title} date={trip.date} />
        ))}
      </div>
      <div className="all-doc-trips">
        {tripsData.map((trip, index) => (
          <TripCard key={index} title={trip.title} date={trip.date} />
        ))}
        {/* Add more trip cards as needed */}
      </div>
    </div>
  );
};

export default Trips;