// archive.js

import React, { useState, useEffect } from 'react';
import TripCard from '../components/TripCard';
import TripModal from '../screens/TripModal';
import '../styles/archive.css';
import axios from 'axios';
import Filter from '../components/filter';
import TripPage from './TripPage';
import Map from '../components/map'; // Import your Map component
import ResizableDivider from '../components/ResizableDivider'; // Import the Resizer

const Archive = ({ authToken, userID }) => {
 // State variables
 const [selectedTrip, setSelectedTrip] = useState(null);
 const [showTripDetails, setShowTripDetails] = useState(false);
 const [showModal, setShowModal] = useState(false);
 const [myTrips, setMyTrips] = useState([]);
 const [tripsData, setTripsData] = useState([]);
 const [filterBySubclub, setFilterBySubclub] = useState('');
 const [filterByLevel, setFilterByLevel] = useState('');
 const [mapWidth, setMapWidth] = useState(50); // State for map width percentage

 // Fetch all trips
 const fetchTrips = async () => {
   try {
     const response = await axios.get('http://127.0.0.1:8000/api/trips/', {
       headers: {
         Authorization: `Bearer ${authToken}`,
       },
     });
     console.log('response: ', response.data);
     setTripsData(response.data);
   } catch (error) {
     console.error('Error fetching trips:', error);
   }
 };

 // Load trips
 useEffect(() => {
   if (authToken) {
     fetchTrips();
   }
 }, [authToken]);

 // Fetch user's trips
 const fetchMyTrips = async () => {
   try {
     if (userID) {
       const response = await axios.get(`http://127.0.0.1:8000/api/trip-registrations/student/${userID}/`, {
         headers: {
           'Authorization': `Bearer ${authToken}`,
           'Content-Type': 'application/json',
         },
       });
       setMyTrips(response.data);
     }
   } catch (error) {
     console.error('Error fetching my archived trips:', error);
   }
 };

 // Load user's trips
 useEffect(() => {
   fetchMyTrips();
 }, []);

 // Trip selection handling
 const handleTripClick = (trip) => {
   setSelectedTrip(trip);
   setShowTripDetails(true);
   setShowModal(true);
 };

 const handleBack = () => {
   setShowTripDetails(false);
   setSelectedTrip(null);
 };

 // Handle resizing of the map
 const handleMouseDown = (e) => {
   e.preventDefault(); // Prevent default drag behavior
   const startX = e.clientX;
   const onMouseMove = (moveEvent) => {
     const newWidth = Math.max(20, Math.min(80, mapWidth + (moveEvent.clientX - startX) / window.innerWidth * 100)); // Width limits: 20% to 80%
     setMapWidth(newWidth);
   };
   const onMouseUp = () => {
     document.removeEventListener('mousemove', onMouseMove);
     document.removeEventListener('mouseup', onMouseUp);
   };
   document.addEventListener('mousemove', onMouseMove);
   document.addEventListener('mouseup', onMouseUp);
 };

 // Date filtering
 const today = new Date();
 today.setHours(0, 0, 0, 0);
 const formattedToday = today.toISOString().split('T')[0]; // YYYY-MM-DD format
 const filteredTrips = tripsData.filter(trip => {
   const subclubMatch = filterBySubclub ? String(trip.subclub) === filterBySubclub : true;
   const levelMatch = filterByLevel ? trip.trip_level === filterByLevel : true;
   const dateMatch = trip.trip_date <= formattedToday;
   return subclubMatch && dateMatch && levelMatch;
 }).reverse();

 const myFilteredTrips = myTrips.filter(trip => {
   const subclubMatch = filterBySubclub ? String(trip.subclub) === filterBySubclub : true;
   const levelMatch = filterByLevel ? trip.trip_level === filterByLevel : true;
   const dateMatch = trip.trip_date <= formattedToday;
   return subclubMatch && dateMatch && levelMatch;
 }).reverse();

 const formatDate = (wrong_date) => {
   const [year, month, day] = wrong_date.split('-');
   return `${month}/${day}/${year.slice(-2)}`;
 };

 // Display conditional logic for trip details remains the same
 if (showTripDetails && selectedTrip) {
   return <TripPage trip={selectedTrip} onBack={handleBack} archive={true} />;
 }

 return (
   <div className="archive-container">
     <div className="archive-trips" style={{ flex: `${mapWidth} 0 0` }}>
       <h1 className="page-title">Archive of Trips</h1>
      
       <div className="filters-container">
         <div className="filters">
           <Filter
             filterBySubclub={filterBySubclub}
             setFilterBySubclub={setFilterBySubclub}
             filterByLevel={filterByLevel}
             setFilterByLevel={setFilterByLevel}
           />
         </div>
       </div>
      
       <h2 className="section-title">My Past Trips</h2>
       <div className="archive-trips-container">
         <div className="trips-column">
           {myFilteredTrips.map((trip) => (
             <div key={trip.id} onClick={() => handleTripClick(trip)}>
               <TripCard title={trip.trip_name} date={formatDate(trip.trip_date)} subclub={trip.subclub} level={trip.trip_level} />
             </div>
           ))}
           {myTrips.length === 0 && <p>No past trips found, get outside!</p>}
         </div>
       </div>
      
       <h2 className="section-title">All DOC Trips</h2>
       <div className="archive-trips-container">
         <div className="trips-column">
           {filteredTrips.map((trip) => (
             <div key={trip.id} onClick={() => handleTripClick(trip)}>
               <TripCard title={trip.trip_name} date={formatDate(trip.trip_date)} subclub={trip.subclub} level={trip.trip_level} />
             </div>
           ))}
         </div>
       </div>
     </div>
    
     <ResizableDivider onDrag={handleMouseDown} />
    
     <div className="map-container" style={{ flex: `${180- mapWidth} 0 0` }}>
       <Map />
     </div>
      <TripModal show={showModal} onHide={() => setShowModal(false)} trip={selectedTrip} />
   </div>
 );
};

export default Archive;