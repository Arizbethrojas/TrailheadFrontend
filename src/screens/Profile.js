import React, { useState, useEffect  } from 'react';
import '../styles/profile.css'; // Import your CSS file

import TripCard from '../components/TripCard'; // Import the TripCard component
import TripModal from '../screens/TripModal'; // Import TripModal for trip details
import fnfImage from '../styles/images/fnf.jpg';
import dmcIcon from '../styles/images/dmcicon.png';
import mteverestAcheivement from '../styles/images/acheivementicons/mteverest.png';
import axios from 'axios'
import TripPage from './TripPage';

const Profile = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRightSection, setShowRightSection] = useState(true); // State to control right section visibility

  // getting trips
  const [myTrips, setMyTrips] = useState([]);

  //fetch users trips
  const fetchMyTrips = async() => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/trip-registrations/student/2/');
      setMyTrips(response.data);
      console.log('mine', response.data);
    }catch (error){
      console.error('Error fetching my archived trips:', error);
    }
  };

  useEffect(() => {
    fetchMyTrips();
  }, []);

  //only display trips that have not already happened
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedToday = today.toISOString().split('T')[0]; //YYYY-MM-DD format

  const filteredTrips = myTrips.filter((trip) => {
    const dateMatch = trip.trip_date >= formattedToday;
    return dateMatch;
  }).reverse();

  const userData = {
    username: "Caroline Casey",
    email: "caroline@gmail.com",
    phone: "781-870-0169",
    age: 19,
    allergies: "tree-nuts, gluten",
    favorite_subclubs: "VHOC",
    // upcomingTrips: [
    //   { id: 1, title: "Title 1", date: "2024-20-11", subclub: "Winter Sports" },
    //   { id: 2, title: "Title 2", date: "2024-20-11", subclub: "Ledyard" },
    // ],
    achievements: Array(12).fill({ icon: mteverestAcheivement }), // Example for 12 achievements
    tripDrafts: [
      { id: 1, title: "Climbing @ Rumney", date: "11/20/24", subclub: "Climbing Team" },
      { id: 2, title: "Kayak on the Connecticut", date: "11/30/24", subclub: "Cabin & Trail" },
      { id: 3, title: "White Water Teaching Session", date: "12/8/24", subclub: "Winter Sports" },
      { id: 4, title: "Trip Draft 4", date: "12/6/24", subclub: "Flora & Fauna" },
      { id: 5, title: "Trip Draft 5", date: "11/23/24", subclub: "Nordic Skiing" },
      { id: 6, title: "Trip Draft 6", date: "11/26/24", subclub: "Mountaineering" },
    ],
  };

  const formatDate = (wrong_date) => {
    const [year, month, day] = wrong_date.split('-');
    return  `${month}/${day}/${year.slice(-2)}`;
  };

  //clicking a trip
  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowTripDetails(true);
    setShowModal(true);
  };

  const handleBack = () => {
    setShowTripDetails(false);
    setSelectedTrip(null);
  };

  const toggleRightSection = () => {
    setShowRightSection(prev => !prev); // Toggle visibility
  };

  if (showTripDetails && selectedTrip) {
    return <TripPage trip={selectedTrip} onBack={handleBack} />;
  }

  return (
    <div className="profile-container">
      <div className="left-section">
        <div className="trips-section">
          <h2>Upcoming Trips</h2>
          <div className="upcoming-trips">
            {filteredTrips.map(trip => (
              <div key={trip.id} onClick={() => handleTripClick(trip)}>
              {/* <div key={trip.id}> */}
                <TripCard title={trip.trip_name} date={formatDate(trip.trip_date)} subclub={trip.subclub} />
              </div>
            ))}
          </div>
        </div>

        <div className="trip-drafts-section">
          <h2>Trip Drafts:</h2>
          <div className="trip-drafts-grid">
            {userData.tripDrafts.map((draft) => (
              // <div key={draft.id} onClick={() => handleTripClick(draft)}> 
              <div key={draft.id}> 
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
              {/* <button className="view-more-button">
                <span>➜</span>
              </button> */}
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