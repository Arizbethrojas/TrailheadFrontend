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
import TripPage from './TripPage';

const Trips = ({authToken, userID}) => {
  // State to manage selected trip and modal visibility
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tripsData, setTripsData] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [trippees, setTrippees] = useState([]);

  const [filterBySubclub, setFilterBySubclub] = useState('');
  const [filterByLevel, setFilterByLevel] = useState('');

  // Handler to open modal and set selected trip
  const handleTripClick = (trip) => {
    fetchWaitlist(trip.id);
    fetchTrippees(trip.id);
    setSelectedTrip(trip);
    // setShowModal(true);
    setShowTripDetails(true);
  };

  const handleBack = () => {
    setShowTripDetails(false);
    setSelectedTrip(null);
  };

  //fetch waitlist when a trip is clicked
  const fetchWaitlist = async (tripID) => {
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/waitlist/${tripID}/`,{ 
        headers:{
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setWaitlist(response.data);
      console.log('data: ', response.data);
      console.log('waitlist: ', waitlist);
      return response.data;
    } catch (err){
      console.log('Error fetching waitlist');
    }
  };

  //fetch trippees when a trip is called
  const fetchTrippees = async (tripID) => {
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/registrations/${tripID}/`,{ 
        headers:{
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setTrippees(response.data);
      console.log('trippees data: ', response.data);
      console.log('trippees: ', trippees);
      return response.data;
    } catch (err){
      console.log('Error fetching trippees');
    }
  };

  const fetchTrips = async() => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/trips/', {
        headers:{
          Authorization: `Bearer ${authToken}`,
        },
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

  //only display trips that haven't happened yet
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedToday = today.toISOString().split('T')[0]; //YYYY-MM-DD format

  // Apply filters to the tripsData
  const filteredTrips = tripsData.filter((trip) => {
    const subclubMatch = filterBySubclub ? String(trip.subclub) === filterBySubclub : true;
    const levelMatch = filterByLevel ? trip.trip_level === filterByLevel : true;
    // console.log('today', formattedToday);
    // console.log('date', trip.trip_date);
    const dateMatch = trip.trip_date >= formattedToday;
    // console.log(trip.subclub)
    // console.log('trip.level', trip.trip_level, 'filterbylevel', filterByLevel);
    return subclubMatch && levelMatch && dateMatch;
  });

  const reverse = filteredTrips.reverse();
  
  const new_trips = reverse.slice(0,5);
  
  const formatDate = (wrong_date) => {
    const [year, month, day] = wrong_date.split('-');
    return  `${month}/${day}/${year.slice(-2)}`;
  };

  // Return TripPage if showing details, otherwise show trips list
  if (showTripDetails && selectedTrip) {
    return <TripPage trip={selectedTrip} onBack={handleBack} userID={userID} authToken={authToken} waitlist={waitlist} trippees={trippees}/>;
  }
  
  return (
    <div className="trips-container">
      <div id='trips-top-line'>
        <div className="header">
          <h1>Explore Trips</h1>
        </div>

        <Filter
          filterBySubclub={filterBySubclub}
          setFilterBySubclub={setFilterBySubclub}
          filterByLevel={filterByLevel}
          setFilterByLevel={setFilterByLevel}
        />
      </div>

      {/* new trips */}
      <h2>Recently Posted Trips</h2>
      <div className="new-trips">
        {new_trips.map((trip) => (
          <div key={trip.id} onClick={() => handleTripClick(trip)}>
            <TripCard title={trip.trip_name} date={formatDate(trip.trip_date)} subclub={trip.subclub} level={trip.trip_level}/>
          </div>
        ))}
      </div>
      {/* all trips */}
      <h2>All Upcoming Trips</h2>
      <div className="all-doc-trips">
        {reverse.map((trip) => (
          <div key={trip.id} onClick={() => handleTripClick(trip)}>
            <TripCard id="all-upcoming" title={trip.trip_name} date={formatDate(trip.trip_date)} subclub={trip.subclub} level={trip.trip_level} width={'80vw'} height={'20px'} margin={'0px'} backgroundColor={'white'} color={'black'} showImage={false}/> 
          </div>
        ))}
      </div>

      {/* Modal for viewing trip details */}
      {/* <TripModal
        show={showModal}
        onHide={() => setShowModal(false)}
        trip={selectedTrip}
      /> */}
    </div>
  );
};

export default Trips;