// src/components/TripCard.js
import React from 'react';
import './tripCard.css'; // Optional: if you want to style specifically for this component

const TripCard = ({ title, date }) => {
  return (
    <div className="trip-card">
      <div className="trip-image"></div> {/* Placeholder for trip image */}
      <div className="trip-title">{title}</div>
      <div className="trip-date">{date}</div>
    </div>
  );
};

export default TripCard;