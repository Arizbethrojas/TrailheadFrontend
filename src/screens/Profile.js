import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import TripCard from '../components/TripCard';
import TripModal from '../screens/TripModal';
import fnfImage from '../styles/images/fnf.jpg';
import dmcIcon from '../styles/images/dmcicon.png';
import mteverestAcheivement from '../styles/images/acheivementicons/mteverest.png';
import axios from 'axios';
import TripPage from './TripPage';
import Autocomplete from 'react-autosuggest';

const BADGE_LEVELS = [
  { threshold: 1, name: "Bronze", description: "5 trips" },
  { threshold: 2, name: "Silver", description: "10 trips" },
  { threshold: 3, name: "Gold", description: "25 trips" }
];

const Profile = ({ authToken }) => {

  const MOCK_REGISTERED_TRIPS = [
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
    
    {
      id: 6,
      trip_name: "Hiking Mt. Moosilauke",
      trip_date: "2024-12-20",
      subclub: "Cabin & Trail"
    },
    
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
    registered_trips: MOCK_REGISTERED_TRIPS, // this is just as a placeholder—does not show up on profile
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
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  const [showBlockList, setShowBlockList] = useState(false);
  const [leader, setLeader] = useState(false);
  const [trippees, setTrippees] = useState([]);
  const [waitlist, setWaitlist] = useState([]);

  
  //blocklist stuff
  useEffect(() => {
    fetchBlockedUsers();
  }, []);
  
  const fetchBlockedUsers = async () => {
    //fetch blockedUsers and set it to the variable
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/blocked-users/', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      setBlockedUsers(response.data);
      console.log('blocked', response.data);
      console.log('complainer', response.data[0].complainer_id);
    }
    catch (error){
      console.error('Error fetching blocklist', error);
    }
  };

  //there is a list of suggestions when you try to block someone
  const fetchSuggestions = async (value) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/students/?search=${value}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('suggestions: ', response.data);
    setSuggestions(response.data);
  };

  const onBlockUser = async (userToBlock) => {
    const isBlocked = blockedUsers.some(user => user.receiver_id === userToBlock);

    if (isBlocked){
      alert('This user is already blocked.');
      return;
    }

    console.log('userToBlock', userToBlock);
    const response = await axios.post('http://127.0.0.1:8000/api/blocked-users/', {
      blocked_student_id: userToBlock
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
    });
    console.log('onBlockUser', response.data)
    fetchBlockedUsers();
  }

  const onSuggestionFetchRequested = ({value}) => {
    fetchSuggestions(value);
  };

  const onSuggestionClearRequested = () => {
    fetchSuggestions([]);
  };

  const toggleBlockList = () =>{
    setShowBlockList(prevShow => !prevShow);
  }

  const inputProps = {
    placeholder: "Block a user",
    value,
    className: "autocomplete-input", //for styling
    onChange: (event, {newValue}) => setValue(newValue)
  };

  //subclub stuff
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


// fixed fetchStudentProfile function
// this function makes API calls to fetch user profile info, fetch the trips the user is registered for
// and update the frontend user data state with this information
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
      // Use the actual student ID from the profile response
      const studentId = response.data.id;
      console.log("Fetching trips for student ID:", studentId);
      
      const tripsResponse = await axios.get(`http://127.0.0.1:8000/api/trip-registrations/student/${studentId}/`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("Trips response:", tripsResponse.data);

  //TRIP FORMATTING
      // map trips by the trip name
      tripsResponse.data.reverse(); //organize them with most recent first

      //only display trips that haven't happened yet
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const formattedToday = today.toISOString().split('T')[0]; //YYYY-MM-DD format

      const filteredTrips = tripsResponse.data.filter((trip) => {
        const dateMatch = trip.trip_date >= formattedToday;
        return dateMatch
      })

      const tripsByName = tripsResponse.data.reduce((acc, trip) => {
        acc[trip.trip_name] = trip;
        return acc;
      }, {});

      // update state with new information
      setUserData(prevData => ({
        ...prevData,
        ...response.data,
        registered_trips: filteredTrips,
        trips_by_name: tripsByName
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


// function to calculate the users badges
const calculateBadges = (trips) => {
  const badges = [];
  const tripsByClub = {};

  console.log("Calculating badges with trips:", trips);
  console.log("Current subclubs:", subclubs);

  trips.forEach(trip => {
    // Get subclub information
    let subclubName = null;
    
    // we need to handle different ways that the subclub might be represented—can be id or name
    if (typeof trip.subclub === 'string') {

      // string handling
      subclubName = trip.subclub;
    } else if (typeof trip.subclub === 'number') {
      // id handling
      const match = subclubs.find(club => club.id === trip.subclub);
      subclubName = match ? match.subclub_name : `Club #${trip.subclub}`;
    } else if (trip.subclub && typeof trip.subclub === 'object') {
      // object handling
      subclubName = trip.subclub.subclub_name || trip.subclub.name;
    }
    
    if (subclubName) {
      if (!tripsByClub[subclubName]) {
        tripsByClub[subclubName] = 0;
      }
      tripsByClub[subclubName]++;
    }
  });

  console.log("Trips by club:", tripsByClub);

  // Ccreate badges based off of count
  Object.entries(tripsByClub).forEach(([subclubName, tripCount]) => {
    // check threshholds
    BADGE_LEVELS.forEach(level => {
      if (tripCount >= level.threshold) {
        badges.push({
          id: `${subclubName}-${level.name}`.toLowerCase().replace(/\s+/g, '-'),
          name: `${subclubName} ${level.name}`,
          subclubName: subclubName,
          description: `Completed ${level.threshold} trips with ${subclubName}`,
          level: level.name,
          tripCount: tripCount
        });
      }
    });
  });

  // check subclubs with no trips
  subclubs.forEach(subclub => {
    const subclubName = subclub.subclub_name;
    
    if (tripsByClub[subclubName]) {
      return;
    }
    // make the subclub with zero trips for display purposes
    tripsByClub[subclubName] = 0;
  });

  console.log("Calculated badges:", badges);
  return badges;
};

useEffect(() => {
  fetchStudentProfile();
  fetchSubclubs();
}, [authToken]);

  useEffect(() => {
    if (subclubs.length > 0 && userData.registered_trips?.length > 0) { 
      console.log("Calculating badges with subclubs:", subclubs);
      console.log("And registered trips:", userData.registered_trips);
      const earnedBadges = calculateBadges(userData.registered_trips);
      console.log("Earned badges calculated:", earnedBadges);
      setUserData(prev => ({ ...prev, badges: earnedBadges }));
    }
  }, [subclubs, userData.registered_trips]);
  

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year.slice(-2)}`;
  };

  const formatSubclubName = (subclub) => {
    if (!subclub) return "Unknown";
    
    // return subclub is string
    if (typeof subclub === 'string') return subclub;
    
    // handling subclub id
    if (typeof subclub === 'number') {
      const match = subclubs.find(club => club.id === subclub);
      return match ? match.subclub_name : `Club #${subclub}`;
    }
    
    // handling subclub object
    return subclub.subclub_name || subclub.name || JSON.stringify(subclub);
  };

  const handleTripClick = (trip, isLeader = false) => {
    setSelectedTrip(trip);
    setShowTripDetails(true);
    setShowModal(true);
    setLeader(isLeader);
    fetchTrippees(trip.id);
    fetchWaitlist(trip.id);
  };

  const handleBack = () => {
    setShowTripDetails(false);
    setSelectedTrip(null);
    setLeader(false);
  };

  //fetch trippees when a trip is clicked
  const fetchTrippees = async (tripID) => {
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/registrations/${tripID}/`,{ 
        headers:{
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setTrippees(response.data);
      return response.data;
    } catch (err){
      console.log('Error fetching trippees');
    }
  };

  //fetch waitlist when a trip is clicked
  const fetchWaitlist = async (tripID) => {
    console.log('tripID', tripID)
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/waitlist/${tripID}/`,{ 
        headers:{
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setWaitlist(response.data);
      return response.data;
    } catch (err){
      console.log('Error fetching waitlist');
    }
  };

  const groupedBadges = userData.badges.reduce((acc, badge) => {
    const subclubName = badge.subclubName;
    
    if (!acc[subclubName]) {
      acc[subclubName] = [];
    }
    
    acc[subclubName].push(badge);
    return acc;
  }, {});

  if (showTripDetails && selectedTrip) {
    if(leader){
      return <TripPage trip={selectedTrip} onBack={handleBack} archive={true} authToken={authToken} leader={true} trippees={trippees} waitlist={waitlist}/>;
    }
    return <TripPage trip={selectedTrip} onBack={handleBack} archive={true} authToken={authToken} trippees={trippees}/>;
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
              <div key={trip.id} onClick={() => handleTripClick(trip, true)}>
                <TripCard 
                  title={trip.trip_name} 
                  date={formatDate(trip.trip_date)} 
                  subclub={formatSubclubName(trip.subclub)}
                />
              </div>
            ))}
          </div>

          <h2>My Upcoming Trips</h2>
          <div className="upcoming-trips">
            {userData.registered_trips?.map(trip => (
              <div key={trip.id} onClick={() => handleTripClick(trip)}>
                <TripCard 
                  title={trip.trip_name} 
                  date={formatDate(trip.trip_date)} 
                  subclub={formatSubclubName(trip.subclub)}
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
            <div style={{ padding: '20px', paddingBottom: '0px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3>Total Trips: {userData.registered_trips.length}</h3>
              </div>

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
            
            <h2>Details</h2>
            <div className="details-box">
              <p>Class Year: {userData.class_year}</p>
              <p>Pronouns: {userData.pronouns}</p>
              <p>Allergies: {userData.allergies}</p>
              {userData.is_trip_leader && <p>Trip Leader Status: Active</p>}
            </div>

            <button className='blocked-button' onClick={toggleBlockList}>
              {showBlockList ? 'Hide Block List': 'Manage Block List'}
            </button>

          {/* Blocking stuff */}
          {showBlockList && (
            <div className='details-box' id='blocked'>
            <h2>Blocked Users</h2>
            <ul className='blocked-users-list'>
              {blockedUsers.map(user => (
                <li key={user.id}>{user.blocked_name}</li>
              ))}
            </ul>

            <Autocomplete
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionFetchRequested}
              onSuggestionClearRequested={onSuggestionClearRequested}
              getSuggestionValue={suggestion => suggestion.student_name}
              renderSuggestion={suggestion => (
                <div onClick={() => onBlockUser(suggestion.id)} style={{cursor: 'pointer', padding: '5px'}}>
                  {suggestion.student_name}
                </div>
              )}
              inputProps={inputProps}
            />
          </div>
          )}
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