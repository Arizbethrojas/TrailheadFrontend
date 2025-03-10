import React, {useEffect, useState} from 'react';
import '../styles/TripPage.css';
import axios from 'axios';

// Import images (if needed for upcoming trips)
import rumneyImage from '../styles/images/rumney.webp';
import dmcImage from '../styles/images/climber.webp';
import ledyardImage from '../styles/images/ledyard.jpg';
import cntImage from '../styles/images/cnt.jpg';
import wscImage from '../styles/images/wsc.jpg';
import clubskiImage from '../styles/images/skier.webp';
import fnfImage from '../styles/images/fnf.jpg';

const TripPage = ({ trip, onBack, userID, authToken, waitlist, trippees, archive=false, leader=false}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [leaderName, setLeaderName] = useState('');
  const [blockedUser, setBlockedUser] = useState(false);
  const [buttonText, setButtonText] = useState('Sign Up!');
  const apiUrl = process.env.REACT_APP_API_URL;

  //display the sign up button differently depending on if they are already on the trip
  useEffect(() => {
    if (waitlist && trippees){
      const onWaitlist = waitlist.some(person => person.waitlist_student===userID);
      const onTrip = trippees.some(person => person.student===userID);

      if (onWaitlist){
        setButtonText('On Waitlist');
        return;
      }
      else if (onTrip){
        setButtonText('On Trip');
        return;
      }

    }
  }, [waitlist, trippees, userID]);

    const handleOpenModal = () => {
      setModalOpen(true);
    }

    //handle images
    const subclubImages = {
      "5": dmcImage, //mountaineering
      "4": cntImage, //cnt
      "8": ledyardImage, //ledyard
      "1": fnfImage, //VHOC
      "3": fnfImage,  //FNF
      "2": wscImage,  //winter sports
      "6": clubskiImage, //nordic
      // "Club Ski": clubskiImage, //club ski
      "7": dmcImage, //climbing
      "9": ledyardImage, //POCO
    };

    const imageSrc = subclubImages[trip.subclub] || 'path/to/default_image.jpg';

    const handleWaitlist = async () => {
      //don't add them if they're already on the waitlist/on the trip
      if (waitlist && trippees){
        const onWaitlist = waitlist.some(person => person.waitlist_student===userID);
        const onTrip = trippees.some(person => person.student===userID);

        if (onWaitlist){
          return;
        }
        else if (onTrip){
          return;
        }

      }
      console.log('signup TripPage')
      try{
        console.log('userID', userID);
        console.log('tripID', trip.id);
        const response = await axios.post(`${apiUrl}/api/register_waitlist/`, {
          student_id: userID, 
          trip_id: trip.id,
        },
        {headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },}
      );
  
        if (response.status === 201){
          alert(response.data.message);
          onBack();
        }
      } catch (err){
        console.log(err.response ? err.response.data.error: 'Error signing up')
      }
    };

    // remove a student from the waitlist
    const handleRemove = async (student_id) => {
      const response = await axios.delete(`${apiUrl}/api/waitlist/remove/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        data: {
          student_id: student_id, 
          trip_id: trip.id,
        }
      }
      );
      alert(response.data.message);
      onBack();

    }

    const handleSignUp = async (student_id) => {
        console.log('signup TripPage')
        try{
          console.log('trip: ', trip.id, 'student', student_id)
          const response = await axios.post(`${apiUrl}/api/register_trip/`, {
            student_id: student_id, 
            trip_id: trip.id,
          },
          {headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },}
        );
        if (response.status===201){
          handleRemove(student_id);
        }
        } catch (err){
          console.log(err.response ? err.response.data.error: 'Error signing up')
        }
      };


      const formatDate = (wrong_date) => {
        const [year, month, day] = wrong_date.split('-');
        return  `${month}/${day}/${year.slice(-2)}`;
      };

      const subclubs = [
        {id:'1', 'subclub_name':'VHOC'},
        {id:'2', 'subclub_name':'Winter Sports'},
        {id:'3', 'subclub_name':'Flora & Fauna'},
        {id:'4', 'subclub_name':'Cabin & Trail'},
        {id:'5', 'subclub_name':'Mountaineering'},
        {id:'6', 'subclub_name':'Nordic Skiing'},
        {id:'7', 'subclub_name':'Climbing Team'},
        {id:'8', 'subclub_name':'Ledyard'},
        {id:'9', 'subclub_name':'POCO'},
      ]

      const trip_type_formatted = {
        "day_trip": "Day Trip",
        "overnight_trip": "Overnight"
      }

      const getSubclubNameById = (id) => {
        // Find the subclub with the matching id
        console.log('id', id)
        const found = subclubs.find(subclub => String(subclub.id) === String(id));
        
        // Return the subclub name or a default message if not found
        return found ? found.subclub_name : 'Subclub not found';
      };

      //stores leader id, want to get leader name
      const getTripLeader = async () => {
        try{
          console.log('tl: ', trip.trip_leader)
          const response = await axios.get(`${apiUrl}/api/student/${trip.trip_leader}/`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          })
          setLeaderName(response.data.student_name);
        }
        //if this is happening its probably just an old trip and the leader is not a user id so it can't map it
        //displaying trip.trip_leader instead
        catch(error){
          console.log('Error fetching trip leader');
          setLeaderName(trip.trip_leader);
        }
      }

      console.log('leader', leader);
      getTripLeader();

      //check if there is a blocked user on the trip
    const checkBlocked = async () => {
      try{
        const blocked = await axios.get(`${apiUrl}/api/blocked-users/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        console.log('blocked', blocked)
        console.log('trippees', trippees)
        const matchedUsers = trippees.filter(trippee => blocked.data.some(block => block.receiver_id === trippee.student));
        console.log('matched', matchedUsers);
        if (matchedUsers.length !== 0){
          setBlockedUser(true);
        }
      }
      catch (error){
        console.error(error)
      }
    }


    useEffect(() => {
      checkBlocked();
    }, []);

    return (
      <div className="min-h-screen">
        {/* Banner Image */}
        <div className="banner-container">
          <img 
            src={imageSrc}
            alt="Mountain landscape with fall colors" 
            className="banner-image"
          />
        </div>
        {/* Back Button */}
        <button onClick={onBack} className="trip-page-back-button">
          ←
        </button>
        {/* Main Content */}
        <div className="trip-page-content-wrapper">
          {/* Title */}
          <div id='top-line'>
            <h1 className="individual-trip-title">{trip.trip_name}</h1>
            {leader && (
              <button className="signup-button" onClick={handleOpenModal}>
                Trippees
              </button>
            )}
            {!archive && (
              <button className="signup-button" onClick={handleWaitlist}>
                {buttonText}
              </button>
            )}
          </div>
          {/* Tags */}
          <div className="tags-container">
            <span className="tag">{trip_type_formatted[trip.trip_type]}</span>
            <span className="tag">{trip.trip_level}</span>
            <span className="tag">{getSubclubNameById(trip.subclub)}</span>
            {blockedUser && (
              <span id="blocked-user">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg>
                <span className='tooltip'> A user you have blocked is on this trip</span>
              </span>
            )}
          </div>
          <div className="horizontal-line"></div>
          {/* Two Column Layout */}
          <div className="grid-layout">
            {/* Description Column */}
            <div className="description">
              <h2>Description</h2>
              <p>{trip.trip_description}</p>
            </div>
            {/* Details Column */}
            <div className="details">
              <h2>Details</h2>
              <div className="details-item">
                <span className="details-label">Date: </span>
                <span className="details-value">{formatDate(trip.trip_date)}</span>
              </div>
              <div className="details-item">
                <span className="details-label">Leader: </span>
                <span className="details-value">{leaderName}</span>
              </div>
              <div className="details-item">
              <span className="details-label">Location: </span>
              <span className="details-value">{trip.trip_location}</span>
              </div>
              <div className="details-item">
              <span className="details-label">Capacity: </span>
                {trippees ? (
                  <span className="details-value">{trippees.length} / {trip.trip_capacity}</span>
                ) : (
                  <span className="details-value">{trip.trip_capacity}</span>
                )}
              </div>
              <div className="details-item">
              <span className="details-label">Bring: </span>
              <span className="details-value">{trip.trip_bring}</span>
              </div>
              <div className="details-item">
              <span className="details-label">Provided: </span>
              <span className="details-value">{trip.trip_provided}</span>
              </div>
            </div>
          </div>
          {/* Waitlist/trippees Modal */}
          {modalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Waitlist</h2>
                <ul>
                  {waitlist.map((person) => (
                    <li key={person.id}>
                      {person.student_name}
                      <button onClick={() => handleSignUp(person.waitlist_student)}>Approve</button>
                      <button onClick={() => handleRemove(person.waitlist_student)}>Deny</button>
                    </li>
                  ))}
                </ul>
                <h2>Trippees</h2>
                <ul>
                  {trippees.map((person) => (
                    <li key={person.id}>
                      {person.student_name}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setModalOpen(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
};
//   return (
//     <div className="min-h-screen">
//       {/* Banner Image */}
//       <div className="banner-container">
//             <img 
//         // src="/mountain_background.png" 
//         src={imageSrc}
//         alt="Mountain landscape with fall colors" 
//         className="banner-image"
//         />
//       </div>

//       {/* Back Button */}
//       <button onClick={onBack} className="back-button">
//         ←
//       </button>

//       {/* Main Content */}
//       <div className="content-wrapper">
//         {/* Title */}
//         <div id='top-line'>
//           <h1 className="individual-trip-title" style={{fontSize:'32px'}}>{trip.trip_name}</h1>
//           {leader && (
//               <button className="signup-button" onClick={handleOpenModal}>
//                 Trippees
//               </button>
//           )}
//           {/* Sign Up Button */}
//           {!archive && (
//             <>
//               <button className="signup-button" onClick={handleWaitlist}>
//                 Sign Up!
//               </button>
//             </>
//           )}
//         </div>

//         {/* Tags */}
//         <div className="tags-container">
//           <span className="tag">{trip_type_formatted[trip.trip_type]}</span>
//           <span className="tag">{trip.trip_level}</span>
//           <span className="tag">{getSubclubNameById(trip.subclub)}</span>
//           {blockedUser && (
//             <span className="tag" id="blocked-user">
//               !
//               <span className='tooltip'> A user you have blocked is on this trip</span>
//             </span>
//           )}
//         </div>

//         <div className="horizontal-line"></div>

//         {/* Two Column Layout */}
//         <div className="grid-layout">
//           {/* Description Column */}
//           <div className="description">
//             <h2>Description</h2>
//             <div className="space-y-4">
//               <p>{trip.trip_description}</p>
//             </div>
//           </div>

//           {/* Details Column */}
//           <div className="details">
//             <h2>Details</h2>
//             <div className="space-y-4">
//             <div className="details-item">
//                 <h3>Date:</h3>
//                 <p>{formatDate(trip.trip_date)}</p>
//               </div>
//               <div className="details-item">
//                 <h3>Leader:</h3>
//                 <p>{leaderName}</p>
//               </div>
//               <div className="details-item">
//                 <h3>Location:</h3>
//                 <p>{trip.trip_location}</p>
//               </div>
//               <div className="details-item">
//                 <h3>Capacity:</h3>
//                 {trippees && (
//                   <p>{trippees.length} / {trip.trip_capacity}</p>
//                 )}
//                 {!trippees && (
//                   <p>{trip.trip_capacity}</p>
//                 )}
//               </div>
//               <div className="details-item">
//                 <h3>Bring:</h3>
//                 <p>{trip.trip_bring}</p>
//               </div>
//               <div className="details-item">
//                 <h3>Provided:</h3>
//                 <p>{trip.trip_provided}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Waitlist/trippees Modal */}
//         {modalOpen && (
//           <div className="modal">
//             <div className="modal-content">
//               <h2>Waitlist</h2>
//               <ul>
//                 {waitlist.map((person) => (
//                   //key is registration id but displays name
//                   <li key={person.id}>
//                     {person.student_name}
//                     <button onClick={() => handleSignUp(person.waitlist_student)}>Approve</button>
//                     <button onClick={() => handleRemove(person.waitlist_student)}>Deny</button>
//                   </li>
//                 ))}
//               </ul>
//               <h2>Trippees</h2>
//               <ul>
//                 {trippees.map((person) => (
//                   //key is registration id but displays name
//                   <li key={person.id}>
//                     {person.student_name}
//                   </li>
//                   ))}
//               </ul>
//               <button onClick={() => setModalOpen(false)}>Close</button>
//               </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

export default TripPage;