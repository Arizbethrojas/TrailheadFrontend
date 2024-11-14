import React from 'react';
import '../styles/tripModal.css';

const TripModal = ({ show, onHide, trip }) => {
  if (!show || !trip) return null;

  return (
    <div className={`modal-overlay ${show ? 'show' : ''}`} onClick={onHide}>
      <div className="modal-content trip-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onHide}>×</button>
        <div className="trip-header">
          <h2>{trip.title || "White Water Kayaking in Hartlands"}</h2>
          <div className="trip-tags">
            <span className="trip-tag">Day Trip</span>
            <span className="trip-tag">Beginner</span>
            <span className="trip-tag">Subclub</span>
          </div>
        </div>
        <div className="trip-body">
          <div className="trip-description">
            <h3>Description</h3>
            <p>
              {trip.description || `We'll be meeting at the river access point in Hartland, VT, where our friendly guides will provide a safety briefing and a quick paddle skills workshop to get everyone comfortable. All gear, including life vests, helmets, and paddles, will be provided. Just bring a swimsuit, a sense of adventure, and a change of clothes!

              After the paddle, we’ll have a casual picnic by the river, so feel free to bring snacks or a packed lunch. This is a great opportunity to connect with other outdoor enthusiasts, make new friends, and experience the beauty of Vermont's waterways. Hope to see you there!`}
            </p>
          </div>
          <div className="trip-details">
            <h3>Details</h3>
            <ul>
              <li><strong>Leader(s):</strong> {trip.leader || "Sammy Rago, Dara Casey, Soni Mbesa"}</li>
              <li><strong>Location:</strong> {trip.location || "Hartlands, VT"}</li>
              <li><strong>Capacity:</strong> {trip.capacity || "10/14"}</li>
              <li><strong>Bring:</strong> {trip.bring || "water bottle, non-cotton clothing"}</li>
              <li><strong>Provided:</strong> {trip.provided || "wet suit, booties, helmet, kayak, PFD"}</li>
            </ul>
          </div>
        </div>
        <button className="sign-up-btn">Sign Up!</button>
      </div>
    </div>
  );
};

export default TripModal;

