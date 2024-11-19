import React, { useState } from 'react';
import '../styles/profile.css'; // Import your CSS file

import TripCard from '../components/TripCard'; // Import the TripCard component
import TripModal from '../screens/TripModal'; // Import TripModal for trip details
import fnfImage from '../styles/images/fnf.jpg';
import dmcIcon from '../styles/images/dmcicon.png';
import mteverestAcheivement from '../styles/images/acheivementicons/mteverest.png';

const Profile = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRightSection, setShowRightSection] = useState(true); // State to control right section visibility

  const userData = {
    username: "Caroline Casey",
    email: "caroline@gmail.com",
    phone: "781-870-0169",
    age: 19,
    allergies: "tree-nuts, gluten",
    favorite_subclubs: "VHOC",
    upcomingTrips: [
      { id: 1, title: "Title 1", date: "10/16", subclub: "Mountaineering" },
      { id: 2, title: "Title 2", date: "10/22", subclub: "Ledyard" },
    ],
    achievements: Array(12).fill({ icon: mteverestAcheivement }), // Example for 12 achievements
    tripDrafts: [
      { id: 1, title: "Climbing @ Rumney", date: "11/05", subclub: "Climbing Team" },
      { id: 2, title: "Kayak on the Connecticut", date: "11/13", subclub: "Cabin & Trail" },
      { id: 3, title: "White Water Teaching Session", date: "12/01", subclub: "Winter Sports" },
      { id: 4, title: "Trip Draft 4", date: "12/10", subclub: "Flora & Fauna" },
      { id: 5, title: "Trip Draft 5", date: "01/15", subclub: "Nordic Skiing" },
      { id: 6, title: "Trip Draft 6", date: "01/20", subclub: "Mountaineering" },
    ],
  };

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const toggleRightSection = () => {
    setShowRightSection(prev => !prev); // Toggle visibility
  };

  return (
    <div className="profile-container">
      <div className="left-section">
        <div className="trips-section">
          <h2>Upcoming Trips</h2>
          <div className="upcoming-trips">
            {userData.upcomingTrips.map(trip => (
              <div key={trip.id} onClick={() => handleTripClick(trip)}>
                <TripCard title={trip.title} date={trip.date} subclub={trip.subclub} />
              </div>
            ))}
          </div>
        </div>

        <div className="trip-drafts-section">
          <h2>Trip Drafts:</h2>
          <div className="trip-drafts-grid">
            {userData.tripDrafts.map((draft) => (
              <div key={draft.id} onClick={() => handleTripClick(draft)}> 
                <TripCard title={draft.title} date={draft.date} subclub={draft.subclub} width={300 / 1.5} height={200 / 1.5} showImage={false} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showRightSection && (
        <div className="right-section">
          <div className="profile-info">
            <div className="profile-header">
              <h1>{userData.username}</h1>
          <p>Favorite Subclubs: {userData.favorite_subclubs}</p>
              <img src={fnfImage} alt="Profile" className="profile-pic" />
            </div>
            <div className="subclub-icons">
              <img src={dmcIcon} alt="Subclub Icon 1" className="subclub-icon" />
              <img src={dmcIcon} alt="Subclub Icon 2" className="subclub-icon" />
            </div>
            <h2>Achievements</h2>
            <div className="achievements-box">
              <div className="achievements-grid">
                {userData.achievements.map((achievement, index) => (
                  <img key={index} src={achievement.icon} alt="Achievement Icon" className="achievement-icon" />
                ))}
              </div>
              <button className="view-more-button">
                <span>➜</span>
              </button>
            </div>
            <h2>Details</h2>
            <div className="details-box">
              <p>Email: {userData.email}</p>
              <p>Phone number: {userData.phone}</p>
              <p>Age: {userData.age}</p>
              <p>Allergies: {userData.allergies}</p>
            </div>
          </div>
        </div>
      )}

      <TripModal
        show={showModal}
        onHide={() => setShowModal(false)}
        trip={selectedTrip}
      />
    </div>
  );
};

export default Profile;