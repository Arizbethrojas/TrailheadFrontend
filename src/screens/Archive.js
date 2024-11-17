import React, { useState, useEffect } from 'react';
import '../styles/globalStyles.css';
import TripCard from '../components/TripCard';
import TripModal from '../screens/TripModal';
import '../styles/archive.css';

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

  const handleFilterChange = (event) => {
    setFilterBySubclub(event.target.value);
  };

  const toggleSignUpFilter = () => {
    setFilterBySignUp(!filterBySignUp);
  };

  const filteredTrips = tripsData.filter((trip) => {
    const subclubMatch = filterBySubclub ? trip.subclub === filterBySubclub : true;
    const signUpMatch = filterBySignUp ? trip.signedUp === true : true;
    return subclubMatch && signUpMatch;
  });

  return (
    <div className="archive-trips">
      <h1 className="page-title">Archive of Trips</h1>
      
      <div className="filters-container">
        <span className="filter-tag">Subclub</span>
        
        <div className="filters">
          <select value={filterBySubclub} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Hiking">Hiking</option>
            <option value="Biking">Biking</option>
            <option value="Climbing">Climbing</option>
          </select>
          
          <label>
            <input 
              type="checkbox" 
              checked={filterBySignUp} 
              onChange={toggleSignUpFilter}
            />
            My trips
          </label>
        </div>

        
      </div>

      <h2 className="section-title">My Past Trips</h2>
      <div className="trips-container">
        <div className="trips-row">
          {filteredTrips.map((trip) => (
            <div 
              key={trip.id} 
              className="trip-card"
              onClick={() => handleTripClick(trip)}
            >
              <div className="trip-card-image" />
              <div className="trip-card-content">
                <span className="trip-card-title">{trip.title}</span>
                <span className="trip-card-date">{trip.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="section-title">All DOC Trips</h2>
      <div className="trips-container">
        <div className="trips-row">
          {filteredTrips.map((trip) => (
            <div 
              key={trip.id} 
              className="trip-card"
              onClick={() => handleTripClick(trip)}
            >
              <div className="trip-card-image" />
              <div className="trip-card-content">
                <span className="trip-card-title">{trip.title}</span>
                <span className="trip-card-date">{trip.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TripModal show={showModal} onHide={() => setShowModal(false)} trip={selectedTrip} />
    </div>
  );
};

export default Archive;