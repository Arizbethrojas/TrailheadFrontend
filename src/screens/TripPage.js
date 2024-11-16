import React from 'react';
import '../styles/TripPage.css';

const TripPage = ({ trip, onBack }) => {
  return (
    <div className="min-h-screen">
      {/* Banner Image */}
      <div className="banner-container">
            <img 
        src="/mountain_background.png" 
        alt="Mountain landscape with fall colors" 
        className="banner-image"
        />
      </div>

      {/* Back Button */}
      <button onClick={onBack} className="back-button">
        ← Back
      </button>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Title */}
        <h1 className="trip-title">{trip.trip_name}</h1>

        {/* Tags */}
        <div className="tags-container">
          <span className="tag">{trip.trip_type}</span>
          <span className="tag">{trip.trip_level}</span>
          <span className="tag">{trip.subclub}</span>
        </div>

        {/* Two Column Layout */}
        <div className="grid-layout">
          {/* Description Column */}
          <div className="description">
            <h2>Description</h2>
            <div className="space-y-4">
              <p>{trip.trip_description}</p>
            </div>
          </div>

          {/* Details Column */}
          <div className="details">
            <h2>Details</h2>
            <div className="space-y-4">
              <div className="details-item">
                <h3>Leader(s):</h3>
                <p>{trip.trip_leader}</p>
              </div>
              <div className="details-item">
                <h3>Location:</h3>
                <p>{trip.trip_location}</p>
              </div>
              <div className="details-item">
                <h3>Capacity:</h3>
                <p>{trip.trip_capacity}</p>
              </div>
              <div className="details-item">
                <h3>Bring:</h3>
                <p>{trip.trip_bring}</p>
              </div>
              <div className="details-item">
                <h3>Provided:</h3>
                <p>{trip.trip_provided}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="signup-button-container">
          <button className="signup-button">
            Sign Up!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripPage;