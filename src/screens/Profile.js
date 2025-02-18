import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import TripCard from '../components/TripCard';
import TripModal from '../screens/TripModal';
import fnfImage from '../styles/images/fnf.jpg';
import dmcIcon from '../styles/images/dmcicon.png';
import mteverestAcheivement from '../styles/images/acheivementicons/mteverest.png';
import axios from 'axios';
import TripPage from './TripPage';

const BADGE_LEVELS = [
  { threshold: 1, name: "Bronze", description: "5 trips" },
  { threshold: 2, name: "Silver", description: "10 trips" },
  { threshold: 3, name: "Gold", description: "25 trips" }
];

const Profile = ({ authToken }) => {

  const MOCK_REGISTERED_TRIPS = [
    // VHOC Trips (3 trips - should earn Bronze, Silver, and Gold)
    {
      id: 1,
      trip_name: "VHOC Trip 1",
      trip_date: "2024-12-15",
      subclub: "VHOC"
    },
    {
      id: 2,
      trip_name: "VHOC Trip 2",
      trip_date: "2024-12-16",
      subclub: "VHOC"
    },
    {
      id: 3,
      trip_name: "VHOC Trip 3",
      trip_date: "2024-12-17",
      subclub: "VHOC"
    },
    
    // Climbing Team Trips (2 trips - should earn Bronze and Silver)
    {
      id: 4,
      trip_name: "Climbing @ Rumney",
      trip_date: "2024-12-18",
      subclub: "Climbing Team"
    },
    {
      id: 5,
      trip_name: "Climbing @ Sundown",
      trip_date: "2024-12-19",
      subclub: "Climbing Team"
    },
    
    // Cabin & Trail Trip (1 trip - should earn Bronze)
    {
      id: 6,
      trip_name: "Hiking Mt. Moosilauke",
      trip_date: "2024-12-20",
      subclub: "Cabin & Trail"
    },
    
    // Flora & Fauna Trips (3 trips - should earn all badges)
    {
      id: 7,
      trip_name: "Bird Watching",
      trip_date: "2024-12-21",
      subclub: "Flora & Fauna"
    },
    {
      id: 8,
      trip_name: "Plant Identification",
      trip_date: "2024-12-22",
      subclub: "Flora & Fauna"
    },
    {
      id: 9,
      trip_name: "Nature Photography",
      trip_date: "2024-12-23",
      subclub: "Flora & Fauna"
    }
  ];
  const [userData, setUserData] = useState({
    student_name: "Test User",
    class_year: "2035",
    pronouns: "they/them",
    allergies: "none",
    is_trip_leader: false,
    registered_trips: MOCK_REGISTERED_TRIPS,
    led_trips: [],
    achievements: Array(12).fill({ icon: mteverestAcheivement }),
    tripDrafts: [],
    badges: []
  });
  
  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [showRightSection, setShowRightSection] = useState(true);
  const [myTrips, setMyTrips] = useState([]);
  const [subclubs, setSubclubs] = useState([]);

  const fetchSubclubs = async () => {
    if (!authToken) return;

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/subclubs/', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      setSubclubs(response.data);
    } catch (error) {
      console.error('Error fetching subclubs:', error);
    }
  };

  const calculateBadges = (trips) => {
    const badges = [];
    const tripsByClub = {};

    console.log("Calculating badges with trips:", trips);
    console.log("Current subclubs:", subclubs);

    // Count trips for each subclub
    trips.forEach(trip => {
      if (!tripsByClub[trip.subclub]) {
        tripsByClub[trip.subclub] = 0;
      }
      tripsByClub[trip.subclub]++;
    });

    console.log("Trips by club:", tripsByClub);

    // Check each subclub against badge thresholds
    subclubs.forEach(subclub => {
      // Use subclub_name instead of name
      const subclubName = subclub.subclub_name;
      const tripCount = tripsByClub[subclubName] || 0;
      
      // Find the highest badge level achieved
      BADGE_LEVELS.forEach(level => {
        if (tripCount >= level.threshold) {
          badges.push({
            id: `${subclubName}-${level.name}`.toLowerCase().replace(/\s+/g, '-'),
            name: `${subclubName} ${level.name}`,
            description: `Completed ${level.threshold} trips with ${subclubName}`,
            tripCount: tripCount
          });
        }
      });
    });

    console.log("Calculated badges:", badges);
    return badges;
};

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
  
      if (response.data.id) {
        console.log("Fetching trips for student ID:", response.data.id);
        const tripsResponse = await axios.get('http://127.0.0.1:8000/api/trip-registrations/student/3/', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
  
        console.log("Trips response:", tripsResponse.data);
  
        // Map trips by trip name
        const tripsByName = tripsResponse.data.reduce((acc, trip) => {
          acc[trip.trip_name] = trip;
          return acc;
        }, {});
  
        // Update state with user data and mapped trips
        setUserData(prevData => ({
          ...prevData,
          ...response.data,
          // registered_trips: tripsResponse.data,
          registered_trips: MOCK_REGISTERED_TRIPS,
          trips_by_name: tripsByName // Add the mapped trips by name
        }));
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


  useEffect(() => {
    fetchStudentProfile();
    fetchSubclubs();
  }, [authToken]);

  useEffect(() => {
    if (subclubs.length > 0) { // Only calculate badges once subclubs are loaded
      const earnedBadges = calculateBadges(userData.registered_trips);
      setUserData(prev => ({
        ...prev,
        badges: earnedBadges
      }));
    }
  }, [userData.registered_trips, subclubs]);
  

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
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

  // Group badges by subclub for display
  const groupedBadges = userData.badges.reduce((acc, badge) => {
    const subclub = badge.name.split(' ')[0];
    if (!acc[subclub]) {
      acc[subclub] = [];
    }
    console.log("Badges:", userData.badges);

    acc[subclub].push(badge);
    return acc;
  }, {});

  if (showTripDetails && selectedTrip) {
    return <TripPage trip={selectedTrip} onBack={handleBack} />;
  }

  const BadgeCircle = ({ achieved, level, count }) => (
    <div style={{
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: achieved ? {
        'Bronze': '#CD7F32',
        'Silver': '#C0C0C0',
        'Gold': '#FFD700'
      }[level] : '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }}>
      {count}
    </div>
  );

  return (
    <div className="profile-container">
      <div className="left-section">
        <div className="trips-section">
          <h2>Trips I'm Leading</h2>
          <div className="upcoming-trips">
            {userData.led_trips?.map(trip => (
              <div key={trip.id} onClick={() => handleTripClick(trip)}>
                <TripCard 
                  title={trip.trip_name} 
                  date={formatDate(trip.trip_date)} 
                  subclub={trip.subclub}
                />
              </div>
            ))}
          </div>

          <h2>Trips I'm Registered For ({userData.registered_trips.length} total)</h2>
          <div className="upcoming-trips">
            {userData.registered_trips?.map(trip => (
              <div key={trip.id} onClick={() => handleTripClick(trip)}>
                <TripCard 
                  title={trip.trip_name} 
                  date={formatDate(trip.trip_date)} 
                  subclub={trip.subclub}
                />
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
            
            <h2>My Badges</h2>
            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3>Total Trips: {userData.registered_trips.length}</h3>
              </div>

              {/* Display badges for each subclub */}
              {Object.entries(groupedBadges).map(([subclub, badges]) => (
                <div key={subclub} style={{ marginBottom: '20px' }}>
                  <h3 style={{ marginBottom: '10px' }}>{subclub}</h3>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <BadgeCircle 
                      achieved={badges.some(b => b.name.includes('Bronze'))} 
                      level="Bronze"
                      count={1}
                    />
                    <BadgeCircle 
                      achieved={badges.some(b => b.name.includes('Silver'))} 
                      level="Silver"
                      count={2}
                    />
                    <BadgeCircle 
                      achieved={badges.some(b => b.name.includes('Gold'))} 
                      level="Gold"
                      count={3}
                    />
                    <span>({badges[0]?.tripCount || 0} trips)</span>
                  </div>
                </div>
              ))}
              {userData.badges.length === 0 && (
                <p>Sign up for trips with different subclubs to earn badges!</p>
              )}
            </div>

            <div className="subclub-icons">
              <img src={dmcIcon} alt="Subclub Icon 1" className="subclub-icon" />
              <img src={dmcIcon} alt="Subclub Icon 2" className="subclub-icon" />
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