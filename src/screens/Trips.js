// src/screens/Trips.js
import React, { useState, useEffect } from 'react';
import '../styles/globalStyles.css'; // Import global styles
import '../styles/trips.css';
import TripCard from '../components/TripCard'; // Import the TripCard component for new trips
import SmallTripCard from '../components/SmallTripCard'; //for all trips
import TripExplore from '../components/getTrips';
import TripModal from '../screens/TripModal'; // Import TripModal component
import axios from 'axios';
import Filter from '../components/filter'; // filter component used in trips and archive 

const Trips = () => {
  // State to manage selected trip and modal visibility
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tripsData, setTripsData] = useState([]);

  const [filterBySubclub, setFilterBySubclub] = useState('');
  const [filterByLevel, setFilterByLevel] = useState('');

  // Handler to open modal and set selected trip
  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  // Assuming TripExplore passes a list of trips as props or fetches them
  // const tripsData = [
  //   { id: 1, title: "Trip 1", date: "10/16", leader: "Leader 1", description: "Description for Trip 1" },
  //   { id: 2, title: "Trip 2", date: "10/16", leader: "Leader 2", description: "Description for Trip 2" },
  //   { id: 3, title: "Trip 3", date: "10/16", leader: "Leader 3", description: "Description for Trip 3" },
  //   { id: 4, title: "Trip 4", date: "10/16", leader: "Leader 4", description: "Description for Trip 4" },
  // ];

  const fetchTrips = async() => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/trips/');
      console.log('response: ', response.data);
      setTripsData(response.data);
    }catch (error){
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);


  // Apply filters to the tripsData
  const filteredTrips = tripsData.filter((trip) => {
    const subclubMatch = filterBySubclub ? String(trip.subclub) === filterBySubclub : true;
    const levelMatch = filterByLevel ? trip.trip_level === filterByLevel : true;
    console.log(trip.subclub)
    console.log('trip.level', trip.trip_level, 'filterbylevel', filterByLevel);
    return subclubMatch && levelMatch;
  });

  const reverse = filteredTrips.reverse();
  
  const new_trips = reverse.slice(0,5);

  const formatDate = (wrong_date) => {
    const [year, month, day] = wrong_date.split('-');
    return  `${month}/${day}/${year.slice(-2)}`;
  };
  
  return (
    <div className="trips-container">
      <div className="header">
        <h1>Explore Trips</h1>
      </div>
      
      {/* Display trips with a "View Details" button for each */}
      {/* new trips */}
      <h2>New Trips</h2>
      <div className="new-trips">
        {new_trips.map((trip) => (
          <div key={trip.id} onClick={() => handleTripClick(trip)}>
            <TripCard title={trip.trip_name} date={formatDate(trip.trip_date)} subclub={trip.subclub} level={trip.trip_level}/>
          </div>
        ))}
      </div>
      <Filter
        filterBySubclub={filterBySubclub}
        setFilterBySubclub={setFilterBySubclub}
        filterByLevel={filterByLevel}
        setFilterByLevel={setFilterByLevel}
      />
      {/* all trips */}
      <h2>All Trips</h2>
      <div className="all-doc-trips">
        {reverse.map((trip) => (
          <div key={trip.id} onClick={() => handleTripClick(trip)}>
            <SmallTripCard title={trip.trip_name} date={formatDate(trip.trip_date)} subclub={trip.subclub} level={trip.trip_level}/>
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
