import React, { useState, useEffect } from 'react';
import '../styles/globalStyles.css';
import TripCard from '../components/TripCard';
import TripModal from '../screens/TripModal';
import '../styles/archive.css';
import axios from 'axios'
import Filter from '../components/filter'; 
import TripPage from './TripPage';

const Archive = ({authToken, userID}) => {
  // trip click
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // getting trips
  const [myTrips, setMyTrips] = useState([]);
  const [tripsData, setTripsData] = useState([]);

  // filtering stuff
  const [filterBySubclub, setFilterBySubclub] = useState('');
  const [filterByLevel, setFilterByLevel] = useState('');

  //fetch all trips
  const fetchTrips = async() => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/trips/', {
        headers:{
          Authorization: `Bearer ${authToken}`,
        }
      });
      console.log('response: ', response.data);
      setTripsData(response.data);
    }catch (error){
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
      if (authToken){
        fetchTrips();
      }
  
    }, [authToken]);


  //fetch users trips
  const fetchMyTrips = async() => {
    try{
      if (userID){
        console.log('this one id: ', userID);
        const response = await axios.get(`http://127.0.0.1:8000/api/trip-registrations/student/${userID}/`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      setMyTrips(response.data);
      console.log('mine', response.data);
      }
    }catch (error){
      console.error('Error fetching my archived trips:', error);
    }
  };

  useEffect(() => {
    fetchMyTrips();
  }, []);

  //clicking a trip
  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowTripDetails(true);
    setShowModal(true);
  };

  const handleBack = () => {
    setShowTripDetails(false);
    setSelectedTrip(null);
  };

  // const handleFilterChange = (event) => {
  //   setFilterBySubclub(event.target.value);
  // };


  //only display trips that have already happened
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedToday = today.toISOString().split('T')[0]; //YYYY-MM-DD format

  const filteredTrips = tripsData.filter((trip) => {
    // console.log('trip.subclub', trip.subclub)
    // console.log('filterBySubclub', filterBySubclub)
    const subclubMatch = filterBySubclub ? String(trip.subclub) === filterBySubclub : true;
    const levelMatch = filterByLevel ? trip.trip_level === filterByLevel : true;
    const dateMatch = trip.trip_date <= formattedToday;
    return subclubMatch && dateMatch && levelMatch;
  }).reverse();


  const myFilteredTrips = myTrips.filter((trip) => {
    const subclubMatch = filterBySubclub ? String(trip.subclub) === filterBySubclub : true;
    const levelMatch = filterByLevel ? trip.trip_level === filterByLevel : true;
    const dateMatch = trip.trip_date <= formattedToday;
    return subclubMatch && dateMatch && levelMatch;
  }).reverse();

  const formatDate = (wrong_date) => {
    const [year, month, day] = wrong_date.split('-');
    return  `${month}/${day}/${year.slice(-2)}`;
  };

  if (showTripDetails && selectedTrip) {
    return <TripPage trip={selectedTrip} onBack={handleBack} archive={true}/>;
  }

  return (
    <div className="archive-trips">
      <h1 className="page-title">Archive of Trips</h1>
      
      <div className="filters-container">
        {/* <span className="filter-tag">Subclub</span> */}
        
        <div className="filters">
          <Filter
            filterBySubclub={filterBySubclub}
            setFilterBySubclub={setFilterBySubclub}
            filterByLevel={filterByLevel}
            setFilterByLevel={setFilterByLevel}
          />
  
        </div>
      </div>

      {/* My trips */}
      <h2 className="section-title">My Past Trips</h2>
      <div className="archive-trips-container">
        <div className="trips-row">
          {myFilteredTrips.map((trip) => (
            <div 
              key={trip.id} 
              onClick={() => handleTripClick(trip)}
            >
              <TripCard title={trip.trip_name} date={formatDate(trip.trip_date)}subclub={trip.subclub} level={trip.trip_level}></TripCard>
            </div>
          ))}
          {myTrips.length === 0 && <p>No past trips found, get outside!</p>}
        </div>
      </div>

      {/* All trips */}
      <h2 className="section-title">All DOC Trips</h2>
      <div className="archive-trips-container">
        <div className="trips-row">
          {filteredTrips.map((trip) => (
            <div 
              key={trip.id} 
              onClick={() => handleTripClick(trip)}
            >
              <TripCard title={trip.trip_name} date={formatDate(trip.trip_date)}subclub={trip.subclub} level={trip.trip_level}></TripCard>
            </div>
          ))}
        </div>
      </div>

      <TripModal show={showModal} onHide={() => setShowModal(false)} trip={selectedTrip} />
    </div>
  );
};

export default Archive;