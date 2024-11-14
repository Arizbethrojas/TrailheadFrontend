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
        <h1 className="trip-title">White Water Kayaking in Hartlands</h1>

        {/* Tags */}
        <div className="tags-container">
          <span className="tag">Day Trip</span>
          <span className="tag">Beginner</span>
          <span className="tag">Subclub</span>
        </div>

        {/* Two Column Layout */}
        <div className="grid-layout">
          {/* Description Column */}
          <div className="description">
            <h2>Description</h2>
            <div className="space-y-4">
              <p>
                We'll be meeting at the river access point in Hartland, VT, where our
                friendly guides will provide a safety briefing and a quick paddle skills
                workshop to get everyone comfortable. All gear, including life vests,
                helmets, and paddles, will be provided. Just bring a swimsuit, a sense of
                adventure, and a change of clothes!
              </p>
              <p>
                After the paddle, we'll have a casual picnic by the river, so feel free to bring
                snacks or a packed lunch. This is a great opportunity to connect with other
                outdoor enthusiasts, make new friends, and experience the beauty of
                Vermont's waterways. Hope to see you there!
              </p>
            </div>
          </div>

          {/* Details Column */}
          <div className="details">
            <h2>Details</h2>
            <div className="space-y-4">
              <div className="details-item">
                <h3>Leader(s):</h3>
                <p>Sammy Rago, Dara Casey, Soni Mbesa</p>
              </div>
              <div className="details-item">
                <h3>Location:</h3>
                <p>Hartlands, VT</p>
              </div>
              <div className="details-item">
                <h3>Capacity:</h3>
                <p>10/14</p>
              </div>
              <div className="details-item">
                <h3>Bring:</h3>
                <p>water bottle, non-cotton clothing</p>
              </div>
              <div className="details-item">
                <h3>Provided:</h3>
                <p>wet suit, booties, helmet, kayak, PFD</p>
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