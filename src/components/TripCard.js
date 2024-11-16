// src/components/TripCard.js
import React from 'react';
import './tripCard.css'; // Optional: if you want to style specifically for this component


const TripCard = ({ title, date, subclub, level }) => {
  return (
    <div className="trip-card">
      <div className="trip-image"></div> {/* Placeholder for trip image */}
      <div className="trip-title">{title}</div>
      <div className="trip-date">{date}</div>
      {/* <div className="subclub">{subclub}</div>
      <div className="trip-level">{level}</div> */}
    </div>
  );
};

export default TripCard;