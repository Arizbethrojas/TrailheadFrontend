// src/components/TripModal.js
import React, {useState} from 'react';
import '../styles/tripModal.css';
import axios from 'axios';


const TripModal = ({ show, onHide, trip, studentID=2 }) => {
  const [error, setError] = useState(null)
  const apiUrl = process.env.REACT_APP_API_URL;
  if (!show || !trip) return null;

  const handleSignUp = async () => {
    console.log('signup')
    try{
      const response = await axios.post(`${apiUrl}/api/register_trip/`, {
        student_id: studentID,
        trip_id: trip.id,
      });

      if (response.status === 201){
        alert(response.data.message);
        onHide();
      }
    } catch (err){
      setError(err.response ? err.response.data.error: 'Error signing up')
    }
  };

  return (
    <div className={`modal-overlay ${show ? 'show' : ''}`} onClick={onHide}>
      <div className="modal-content trip-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onHide}>×</button>
        <div className="trip-header">
          <h2>{trip.trip_name}</h2>
          <div className="trip-tags">
            <span className="trip-tag">{trip.trip_type}</span>
            <span className="trip-tag">{trip.trip_level}</span>
            <span className="trip-tag">{trip.subclub}</span>
          </div>
        </div>
        <div className="trip-body">
          <div className="trip-description">
            <h3>Description</h3>
            <p>
              {trip.trip_description}
            </p>
          </div>
          <div className="trip-details">
            <h3>Details</h3>
            <ul>
              <li><strong>Leader(s):</strong> {trip.trip_leader}</li>
              <li><strong>Location:</strong> {trip.trip_location}</li>
              <li><strong>Capacity:</strong> {trip.trip_capacity}</li>
              <li><strong>Bring:</strong> {trip.trip_bring}</li>
              <li><strong>Provided:</strong> {trip.trip_provided}</li>
            </ul>
          </div>
        </div>
        <button className="sign-up-btn" onClick={handleSignUp}>Sign Up!</button>
      </div>
    </div>
  );

  // return (
  //   <div className={`modal-overlay ${show ? 'show' : ''}`} onClick={onHide}>
  //     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
  //       <button className="modal-close" onClick={onHide}>×</button>
  //       <h2>{trip.trip_name}</h2>
  //       <p><strong>Leader:</strong> {trip.trip_leader}</p>
  //       <p><strong>Date:</strong> {trip.trip_date}</p>
  //       <p><strong>Description:</strong> {trip.trip_description}</p>
  //       <p><strong>Subclub: </strong>{trip.subclub}</p>
  //       <p><strong>Capacity: </strong>{trip.trip_capacity}</p>
  //       <p><strong>Location: </strong>{trip.trip_location}</p>
  //       <p><strong>Type: </strong>{trip.trip_type}</p>
  //       <p><strong>Level: </strong>{trip.trip_level}</p>
  //       <p><strong>Bring: </strong>{trip.trip_bring}</p>
  //       <p><strong>Provided: </strong>{trip.trip_provided}</p>
        
  //     </div>
  //   </div>
  // );
};

export default TripModal;
