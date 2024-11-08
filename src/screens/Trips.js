// src/screens/Trips.js
import React, { useState } from 'react';
import '../styles/globalStyles.css'; // Import global styles
import TripCard from '../components/TripCard'; // Import the TripCard component
import TripExplore from '../components/getTrips';
import TripModal from '../screens/TripModal'; // Import TripModal component

const Trips = () => {
  // State to manage selected trip and modal visibility
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handler to open modal and set selected trip
  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  // Assuming TripExplore passes a list of trips as props or fetches them
  const tripsData = [
    { id: 1, title: "Trip 1", date: "10/16", leader: "Leader 1", description: "Description for Trip 1" },
    { id: 2, title: "Trip 2", date: "10/16", leader: "Leader 2", description: "Description for Trip 2" },
    { id: 3, title: "Trip 3", date: "10/16", leader: "Leader 3", description: "Description for Trip 3" },
    { id: 4, title: "Trip 4", date: "10/16", leader: "Leader 4", description: "Description for Trip 4" },
  ];

  return (
    <div className="trips-container">
      <div className="header">
        <h1>Dartmouth Outing Club Trips</h1>
        <div className="icons">
          <span className="bell">🔔</span> {/* Notification icon */}
          <img src="path-to-your-profile-image" alt="Profile" className="profile-pic" />
        </div>
      </div>
      
      {/* Display trips with a "View Details" button for each */}
      <div className="all-doc-trips">
        {tripsData.map((trip) => (
          <div key={trip.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <TripCard title={trip.title} date={trip.date} />
            <button
              onClick={() => handleTripClick(trip)}
              style={{ marginLeft: '10px' }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for viewing trip details */}
      <TripModal
        show={showModal}
        onHide={() => setShowModal(false)}
        trip={selectedTrip}
      />
    </div>
  );
};

export default Trips;
