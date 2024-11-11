// src/screens/Profile.js
import React, { useState } from 'react';
import '../styles/profile.css'; // Import your CSS file

import TripCard from '../components/TripCard'; // Import the TripCard component
import TripModal from '../screens/TripModal'; // Import TripModal for trip details

const Profile = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const userData = {
    username: "Caroline Casey",
    email: "caroline@gmail.com",
    phone: "781-870-0169",
    age: 19,
    allergies: "tree-nuts, gluten",
    upcomingTrips: [
      { id: 1, title: "Title 1", date: "10/16" },
      { id: 2, title: "Title 2", date: "10/22" },
    ],
    achievements: [
      {
        text: "Accumulate a hiking distance that equals Mount Everest",
        icon: "path/to/your/achievement-icon1.png" // Replace with actual path
      },
      {
        text: "Reached 100 miles in hiking",
        icon: "path/to/your/achievement-icon2.png" // Replace with actual path
      },
      {
        text: "Participated in 5 outdoor education workshops",
        icon: "path/to/your/achievement-icon3.png" // Replace with actual path
      },
    ],
    tripDrafts: [
      {
        text: "Climbing @ Rumney",
        icon: "path/to/your/draft-icon1.png", // Replace with actual path
        details: "Details about climbing @ Rumney"
      },
      {
        text: "Kayak on the Connecticut",
        icon: "path/to/your/draft-icon2.png", // Replace with actual path
        details: "Details about kayak on the Connecticut"
      },
      {
        text: "White water teaching session",
        icon: "path/to/your/draft-icon3.png", // Replace with actual path
        details: "Details about white water teaching session"
      },
    ],
  };

  // Function to handle modal open and set selected trip
  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  return (
    <div className="profile-container">
      <div className="left-section">
        <div className="trips-section">
          <h2>Upcoming Trips:</h2>
          <div className="upcoming-trips">
            {userData.upcomingTrips.map(trip => (
              <div key={trip.id} onClick={() => handleTripClick(trip)}>
                <TripCard title={trip.title} date={trip.date} />
              </div>
            ))}
          </div>
        </div>

        <div className="achievements-drafts-container">
          <div className="achievements-section">
            <h2>Achievements:</h2>
            <ul className="achievements-list">
              {userData.achievements.map((achievement, index) => (
                <li key={index} className="achievement-item">
                  <img src={achievement.icon} alt="Achievement Icon" className="achievement-icon" />
                  {achievement.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="trip-drafts-section">
            <h2>Trip Drafts:</h2>
            <ul className="trip-drafts-list">
              {userData.tripDrafts.map((draft, index) => (
                <li key={index} className="trip-draft-item" onClick={() => handleTripClick(draft)}>
                  <img src={draft.icon} alt="Draft Icon" className="draft-icon" />
                  {draft.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="profile-info">
          <img src="path-to-your-profile-image" alt="Profile" className="profile-pic" />
          <h1>{userData.username}</h1>
          <p>Email: {userData.email}</p>
          <p>Phone number: {userData.phone}</p>
          <p>Age: {userData.age}</p>
          <p>Allergies: {userData.allergies}</p>
        </div>
      </div>

      {/* Modal for viewing trip details */}
      <TripModal
        show={showModal}
        onHide={() => setShowModal(false)}
        trip={selectedTrip} // Pass selected trip details
      />
    </div>
  );
};

export default Profile;