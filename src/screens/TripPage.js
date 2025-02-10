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

const TripPage = ({ trip, onBack, studentID, authToken }) => {
  const [waitlist, setWaitlist] = useState([]);
  const [trippees, setTrippees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null)

  const getCookie = (name) =>{
      let cookieValue = null;
      if (document.cookie && document.cookie !== ''){
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++){
          const cookie = cookies[i].trim();
          // if(cookie.substring(0, name.length + 1) === (name + '=')){
          if(cookie.startsWith(name + '=')){
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue
    };


    //data flow
    //user signs up for trip
    //entry made in waitlist
    //leader approves user
    //entry made in tripregistration
    //# of ppl on trip on frontend is constatnly pulling from db and saying 
    // how many ppl are on trip from registrations in db

    //data flow from leader
    //if they are leading the trip trippees button appears
    //pull registrations from db
    //pull waitlist from db

    //fetch waitlist when the modal opens
    const fetchWaitlist = async () => {
      const token = getCookie('cstftoken');
      console.log('fetchw token', token);
      try{
        const response = await axios.get(`http://127.0.0.1:8000/api/waitlist/${trip.id}/`,{ 
          headers:{
            'X-CSRFToken': token,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        console.log(response.data);
        setWaitlist(response.data);
      } catch (err){
        setError('Error fetching waitlist');
      }
    };

    //errors
    //also display who's already on the trip in the modal
    const fetchTrippees = async () => {
      const token = getCookie('cstftoken');
      console.log('fetchtrip token', token);
      try{
        const response = await axios.get(`http://127.0.0.1:8000/api/trip-registrations/${trip.id}/`,{ 
          headers:{
            'X-CSRFToken': token,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });
        console.log('trippee data: ', response.data);
        setTrippees(response.data);
      } catch (err){
        setError('Error fetching trippees');
      }
    };

    const handleOpenModal = () => {
      fetchWaitlist();
      fetchTrippees();
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

    //rn a user signs up and is automatically added to the trip
    //change this functionality so they go to waitlist first--done
    //now we need it so tls confirm or deny

    //add them to the waitlist
    const handleWaitlist = async () => {
      // const token = getCookie('csrftoken');
      const token = 'wzQdZGc6HpfcHtn7zL6WvG3FhSSRBGJH';
      console.log('wtoken', token);
      try{
        const response = await axios.post('http://127.0.0.1:8000/api/register_waitlist/', { 
          student_id: studentID,
          trip_id: trip.id,
        },
        {headers: {
          'X-CSRFToken': token,
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },}
      );
      if (response.status === 201){
        alert(response.data.message);
        onBack();
      }
      console.log('User added to waitlist')
      } catch (err){
        console.log('Error adding student to waitlist: ', err)
      }
    };

    //errors
    //add them onto the trip and remove them from the waitlist
    const handleSignUp = async (student_id) => {
        // const token = getCookie('csrftoken'); //obtain csrf token
        const token = 'wzQdZGc6HpfcHtn7zL6WvG3FhSSRBGJH'
        console.log('signup TripPage');
        console.log('sutoken', token);
        try{
          const response = await axios.post('http://127.0.0.1:8000/api/register_trip/', {
            student_id: student_id, 
            trip_id: trip.id,
          },
          console.log('token1: ', token),
          {headers: {
            'X-CSRFToken': token,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },}
        );
        console.log('API response: ', response);
          // if (response.status === 201){
          //   const removeResponse = await axios.delete('http://127.0.0.1:8000/api/waitlist/remove/', {
          //     student_id: studentID, 
          //     trip_id: trip.id,
          //     },
          //     console.log('studentID', studentID),
          //     console.log('tripID', trip.id),
          //     console.log('token: ', token),
          //     console.log('authToken: ', authToken),
          //     {headers: {
          //       'X-CSRFToken': token,
          //       'Content-Type': 'application/json',
          //       'Authorization': `Bearer ${authToken}`,
          //     },}
          //   );
          //   if (removeResponse.status === 204){
          //     setWaitlist(waitlist.filter(item => item.student_id !== studentID));
          //   }
          //   alert('User approved for the trip!');
          //   onBack();
          // }
        } catch (err){
          console.error('Error approving the user: ', err);
        }
      };

      //handle after
      // const handleDeny = async () => {

      // }

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
        // console.log(subclubs[String(id)])
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
          {/* was handleSignUp on click changing to waitlist */}
          <button className="signup-button" onClick={handleWaitlist}> 
            Sign Up!
          </button>
          <button className="trippees-button" onClick={handleOpenModal}>
            Trippees
          </button>
        </div>

        {/* Waitlist/trippees Modal */}
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Waitlist</h2>
              {error && <p>{error}</p>}
              <ul>
                {waitlist.map((person) => (
                  //key is registration id but displays name
                  <li key={person.id}>
                    {person.student_name}
                    <button onClick={() => handleSignUp(person.student_id)}>Approve</button>
                  </li>
                ))}
              </ul>
              <h2>Trippees</h2>
              {error && <p>{error}</p>}
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