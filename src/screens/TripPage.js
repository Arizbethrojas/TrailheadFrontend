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

const TripPage = ({ trip, onBack, userID, authToken, waitlist, trippees, archive=false}) => {
  const [modalOpen, setModalOpen] = useState(false);

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
      //don't add them if they're already on the waitlist
      if (waitlist){
        const onWaitlist = waitlist.some(person => person.waitlist_student===userID);

        if (onWaitlist){
          alert('You are already on the waitlist');
          return;
        }

      }
      console.log('signup TripPage')
      try{
        const response = await axios.post('http://127.0.0.1:8000/api/register_waitlist/', {
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
      const response = await axios.delete('http://127.0.0.1:8000/api/waitlist/remove/', {
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
          const response = await axios.post('http://127.0.0.1:8000/api/register_trip/', {
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

  return (
    <div className="min-h-screen">
      {/* Banner Image */}
      <div className="banner-container">
            <img 
        // src="/mountain_background.png" 
        src={imageSrc}
        alt="Mountain landscape with fall colors" 
        className="banner-image"
        />
      </div>

      {/* Back Button */}
      <button onClick={onBack} className="back-button">
        ←
      </button>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Title */}
        <h1 className="trip-title">{trip.trip_name}</h1>

        {/* Tags */}
        <div className="tags-container">
          <span className="tag">{trip_type_formatted[trip.trip_type]}</span>
          <span className="tag">{trip.trip_level}</span>
          <span className="tag">{getSubclubNameById(trip.subclub)}</span>
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
                <h3>Date:</h3>
                <p>{formatDate(trip.trip_date)}</p>
              </div>
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
          {!archive && (
            <>
              <button className="signup-button" onClick={handleWaitlist}>
                Sign Up!
              </button>
              <button className="trippees-button" onClick={handleOpenModal}>
                Trippees
              </button>
            </>
          )}
        </div>
        {/* Waitlist/trippees Modal */}
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Waitlist</h2>
              <ul>
                {waitlist.map((person) => (
                  //key is registration id but displays name
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
                  //key is registration id but displays name
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

export default TripPage;