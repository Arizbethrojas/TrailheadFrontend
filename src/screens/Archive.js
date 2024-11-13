// Archive.js
import React, { useState, useEffect } from 'react';
import '../styles/globalStyles.css';
import TripCard from '../components/TripCard';
import TripModal from '../screens/TripModal';
import Filter from '../components/filter'; 

const Archive = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterBySubclub, setFilterBySubclub] = useState('');
  const [filterBySignUp, setFilterBySignUp] = useState(false);
  const [tripsData, setTripsData] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const pastTrips = [
        { id: 1, title: "Gile Hike", date: "01/01", leader: "sammy", subclub: "Hiking", signedUp: true },
        { id: 2, title: "Rip rd", date: "02/01", leader: "soni", subclub: "Biking", signedUp: false },
        { id: 3, title: "orange mt", date: "03/01", leader: "ari", subclub: "Hiking", signedUp: true },
        { id: 4, title: "climbing gym", date: "03/01", leader: "Dara", subclub: "Climbing", signedUp: false },
      ];
      setTripsData(pastTrips);
    };
    fetchTrips();
  }, []);

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const filteredTrips = tripsData.filter((trip) => {
    const subclubMatch = filterBySubclub ? trip.subclub === filterBySubclub : true;
    const signUpMatch = filterBySignUp ? trip.signedUp === true : true;
    return subclubMatch && signUpMatch;
  });

  return (
    <div className="archive-trips">
      <div className="header">
        <h1>Archive of Trips</h1>
      </div>

      {/* Include the Filter component */}
      <Filter 
        filterBySubclub={filterBySubclub}
        setFilterBySubclub={setFilterBySubclub}
        filterBySignUp={filterBySignUp}
        setFilterBySignUp={setFilterBySignUp}
      />

      <div className="archive-trips">
        {filteredTrips.map((trip) => (
          <div key={trip.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <TripCard title={trip.title} date={trip.date} />
            <button onClick={() => handleTripClick(trip)} style={{ marginLeft: '10px' }}>
              View Details
            </button>
          </div>
        ))}
      </div>

      <TripModal show={showModal} onHide={() => setShowModal(false)} trip={selectedTrip} />
    </div>
  );
};

export default Archive;
