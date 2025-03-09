// src/components/TripList.js
import React, { useState } from 'react';
import TripModal from './TripModal';

const trips = [
  { id: 1, name: 'Gile Hike', leader: 'Ari', date: '2024-10-31', description: 'A hike up Gile Mountain.' },
  { id: 2, name: 'Test Trip', leader: 'Sammy', date: '2024-10-31', description: 'This is a test trip.' }
];

const TripList = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Explore Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id} style={{ marginBottom: '10px' }}>
            {trip.name} - {trip.leader} on {trip.date}
            <button
              onClick={() => handleTripClick(trip)}
              style={{ marginLeft: '10px' }}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>

      <TripModal
        show={showModal}
        onHide={() => setShowModal(false)}
        trip={selectedTrip}
      />
    </div>
  );
};

export default TripList;
