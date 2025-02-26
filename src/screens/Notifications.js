// src/screens/Trips.js
import React, { useState, useEffect } from 'react';
import '../styles/globalStyles.css'; // Import global styles
import '../styles/trips.css';
import '../styles/notifications.css';
import TripCard from '../components/TripCard'; // Import the TripCard component for new trips
import SmallTripCard from '../components/SmallTripCard'; //for all trips
import TripExplore from '../components/getTrips';
import TripModal from './TripModal'; // Import TripModal component
import axios from 'axios';
import Filter from '../components/filter'; // filter component used in trips and archive 
import TripPage from './TripPage';

const Notifications = ({authToken}) => {
  // State to manage selected trip and modal visibility
  // const [selectedTrip, setSelectedTrip] = useState(null);
  // const [showTripDetails, setShowTripDetails] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [notificationsData, setNotificationsData] = useState([]);

  const fetchNotifications = async() => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
        headers:{
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('response: ', response.data);
      setNotificationsData(response.data);
    }catch (error){
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    if (authToken){
      fetchNotifications();
    }
  }, [authToken]);

  const message = notificationsData.message

  return (
    <div className="notifications-container">
      <div className="header">
        <h1>Notifications</h1>
      </div>

      <div className="new-notification">
        {notificationsData.map((notification) => (

          // <div key={notification.id} onClick={() => handleTripClick(trip)}>
        <div key={notification.id}>
          {notification.message} - 
        </div>
          // </div>
        ))}
      </div>

      {/* all trips */}
      {/* <h2>All Trips</h2>
      <div className="all-doc-trips">
        {reverse.map((trip) => (
          <div key={trip.id} onClick={() => handleTripClick(trip)}>
            <TripCard title={trip.trip_name} date={formatDate(trip.trip_date)} subclub={trip.subclub} level={trip.trip_level} width={'150px'} height={'100px'} showImage={false}/>
          </div>
        ))}
      </div> */}

      {/* Modal for viewing trip details */}
      {/* <TripModal
        show={showModal}
        onHide={() => setShowModal(false)}
        trip={selectedTrip}
      /> */}
    </div>
  );
};

export default Notifications;
