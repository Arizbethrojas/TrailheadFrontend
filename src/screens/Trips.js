import React, { useState } from 'react';
import '../styles/globalStyles.css';
import TripCard from '../components/TripCard';
import TripExplore from '../components/getTrips';
import TripPage from './TripPage';

const Trips = () => {
  // State to manage selected trip and view state
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripDetails, setShowTripDetails] = useState(false);

  // Handler to show trip details and set selected trip
  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowTripDetails(true);
  };

  // Handler to go back to trips list
  const handleBack = () => {
    setShowTripDetails(false);
    setSelectedTrip(null);
  };

  // Assuming TripExplore passes a list of trips as props or fetches them
  const tripsData = [
    { id: 1, title: "Trip 1", date: "10/16", leader: "Leader 1", description: "Description for Trip 1" },
    { id: 2, title: "Trip 2", date: "10/16", leader: "Leader 2", description: "Description for Trip 2" },
    { id: 3, title: "Trip 3", date: "10/16", leader: "Leader 3", description: "Description for Trip 3" },
    { id: 4, title: "Trip 4", date: "10/16", leader: "Leader 4", description: "Description for Trip 4" },
  ];

  // Return TripPage if showing details, otherwise show trips list
  if (showTripDetails && selectedTrip) {
    return <TripPage trip={selectedTrip} onBack={handleBack} />;
  }

  return (
    <div className="trips-container">
      <div className="header">
        <h1>Dartmouth Outing Club Trips</h1>
        <div className="icons">
          <span className="bell">🔔</span>
          <img src="path-to-your-profile-image" alt="Profile" className="profile-pic" />
        </div>
      </div>

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
    </div>
  );
};

export default Trips;