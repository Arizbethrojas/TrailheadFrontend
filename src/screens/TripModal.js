// src/components/TripModal.js
import React from 'react';
import '../styles/tripModal.css';


const TripModal = ({ show, onHide, trip }) => {
  if (!show || !trip) return null;

  return (
    <div className={`modal-overlay ${show ? 'show' : ''}`} onClick={onHide}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onHide}>×</button>
        <h2>{trip.title}</h2>
        <p><strong>Leader:</strong> {trip.leader}</p>
        <p><strong>Date:</strong> {trip.date}</p>
        <p><strong>Description:</strong> {trip.description}</p>
      </div>
    </div>
  );
};

export default TripModal;
