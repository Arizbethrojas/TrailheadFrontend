// src/components/TripCard.js
import React from 'react';
import './smallTripCard.css'; // Optional: if you want to style specifically for this component


const SmallTripCard = ({ title, date, subclub, level }) => {
  return (
    <div className="small-trip-card">
      <div className="small-trip-image"></div> {/* Placeholder for trip image */}
      <div className="small-trip-title">{title}</div>
      <div className="small-trip-date">{date}</div>
      <div className="small-subclub">{subclub}</div>
      <div className="small-trip-level">{level}</div>
    </div>
  );
};

export default SmallTripCard;