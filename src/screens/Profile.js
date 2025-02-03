import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import TripCard from '../components/TripCard';
import TripModal from '../screens/TripModal';
import fnfImage from '../styles/images/fnf.jpg';
import dmcIcon from '../styles/images/dmcicon.png';
import mteverestAcheivement from '../styles/images/acheivementicons/mteverest.png';
import axios from 'axios';
import TripPage from './TripPage';

const Profile = ({ authToken }) => {  // Add authToken as a prop here
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRightSection, setShowRightSection] = useState(true);
  const [myTrips, setMyTrips] = useState([]);
  const [userData, setUserData] = useState({
    student_name: "",
    class_year: "",
    pronouns: "",
    allergies: "",
    is_trip_leader: false,
    achievements: Array(12).fill({ icon: mteverestAcheivement }),
    tripDrafts: [
      { id: 1, title: "Climbing @ Rumney", date: "11/20/24", subclub: "Climbing Team" },
      { id: 2, title: "Kayak on the Connecticut", date: "11/30/24", subclub: "Cabin & Trail" },
      { id: 3, title: "White Water Teaching Session", date: "12/8/24", subclub: "Winter Sports" },
      { id: 4, title: "Trip Draft 4", date: "12/6/24", subclub: "Flora & Fauna" },
      { id: 5, title: "Trip Draft 5", date: "11/23/24", subclub: "Nordic Skiing" },
      { id: 6, title: "Trip Draft 6", date: "11/26/24", subclub: "Mountaineering" },
    ]
  });


  const fetchStudentProfile = async () => {
    if (!authToken) {
        console.log("No auth token available");
        return;
    }
    
    try {
        console.log("Making profile request with token:", authToken);
        const response = await axios.get('http://127.0.0.1:8000/api/student/current/', {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log("Profile response:", response.data);
        
        setUserData(prevData => ({
            ...prevData,
            ...response.data
        }));
        
        if (response.data.id) {
            console.log("Fetching trips for student ID:", response.data.id);
            const tripsResponse = await axios.get(`http://127.0.0.1:8000/api/trip-registrations/student/${response.data.id}/`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Trips response:", tripsResponse.data);
            setMyTrips(tripsResponse.data);
        }
    } catch (error) {
        console.log("Error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        console.error('Error fetching profile data:', error);
    }
};

  const laProfile = ({ authToken }) => {
    console.log("Auth Token:", authToken);}  // Add this line

  useEffect(() => {
    fetchStudentProfile();
  }, []); // Remove authToken from dependency array

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedToday = today.toISOString().split('T')[0];

  const filteredTrips = myTrips.filter((trip) => {
    const dateMatch = trip.trip_date >= formattedToday;
    return dateMatch;
  }).reverse();

  const formatDate = (wrong_date) => {
    const [year, month, day] = wrong_date.split('-');
    return `${month}/${day}/${year.slice(-2)}`;
  };

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
    setShowRightSection(prev => !prev);
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
                <TripCard title={trip.trip_name} date={formatDate(trip.trip_date)} subclub={trip.subclub} />
              </div>
            ))}
          </div>
        </div>

        <div className="trip-drafts-section">
          <h2>Trip Drafts:</h2>
          <div className="trip-drafts-grid">
            {userData.tripDrafts.map((draft) => (
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
              <h1>{userData.student_name}</h1>
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
            </div>
            <h2>Details</h2>
            <div className="details-box">
              <p>Class Year: {userData.class_year}</p>
              <p>Pronouns: {userData.pronouns}</p>
              <p>Allergies: {userData.allergies}</p>
              {userData.is_trip_leader && <p>Trip Leader Status: Active</p>}
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