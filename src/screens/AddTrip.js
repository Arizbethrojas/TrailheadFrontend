// Author: Sammy Rago 
// Purpose: Form to create a new trip
// Date: 10/27

// src/screens/AddTrip.js
import React, { useState, useEffect } from 'react';
import '../styles/globalStyles.css'; // Import global styles
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../styles/addTrip.css';

const AddTrip = ({onTripCreated, authToken, userID, userName}) => {
  console.log('userID', userID);
  console.log('username', userName);
  const [formData, setFormData] = useState({
    trip_name: '',
    trip_date: '',
    trip_description: '',
    trip_leader: String(userID),
    trip_capacity: 0,
    subclub: '',
    trip_type: '',
    trip_level: '',
    trip_location: '',
    trip_bring: '',
    trip_provided: ''
  });

  const [subclubs, setSubclubs] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const tripTypeOptions = [
    {value:'', label:'Select Trip Type'},
    {value:'day_trip', label:'Day Trip'},
    {value:'overnight_trip', label:'Overnight'},
  ];

  const tripLevelOptions = [
    {value:'', label:'Select Trip Level'},
    {value:'beginner', label:'Beginner'},
    {value:'intermediate', label:'Intermediate'},
    {value:'advanced', label:'Advanced'},
  ]
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubclubs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/subclubs/`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Set the authorization token
          },
        });
        setSubclubs(response.data);
      } catch (error){
        console.error('Error fetching subclubs:', error);
      }
    };
    if (authToken){
      fetchSubclubs();
    }
  }, [authToken]);

  //function to get CSRF token so i can make POST requests
  // const getCookie = (name) =>{
  //   let cookieValue = null;
  //   if (document.cookie && document.cookie !== ''){
  //     const cookies = document.cookie.split(';');
  //     for(let i = 0; i < cookies.length; i++){
  //       const cookie = cookies[i].trim();
  //       if(cookie.substring(0, name.length = 1) === (name + '=')){
  //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
  //         break;
  //       }
  //     }
  //   }
  //   return cookieValue
  // }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tripDataToSubmit = {...formData, trip_leader: formData.trip_leader};
    try{
      const response = await axios.post(`${apiUrl}/api/trips/`, tripDataToSubmit, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
      console.log(response.data);
      onTripCreated(response.data);
      navigate('/trips');
    } catch (error){
      console.error('There was an error creating the trip', error.response ? error.response.data : error.message);

    }
  };

return (
  <div className="app-container">
    <h2 className='add-trip-title'>Plan a Trip</h2>
    <div className="add-trip-container">
      <form onSubmit={handleSubmit} className="trip-form">
        {/* LINE 1: TITLE AND LEADERS*/}
        <div className="shared-line" id="line1">
          {/* TITLE */}
          <div className="form-question">
            <label className='form-label'>Title</label>
            <input type="text" className="form-input" id="title" name="trip_name" value={formData.trip_name} onChange={handleChange} required />
          </div>
          {/* LEADERS */}
          <div className="form-question">
            <label className='form-label'>Leader</label>
            <div className='form-input' id='leader'>
              {userName}
            </div>
            {/* <input type="text" className="form-input" id="leader" name="trip_leader" value={formData.trip_leader} onChange={handleChange} required /> */}
          </div>
        </div>
        {/* LINE 2: LOCATION AND DATE */}
        <div className="shared-line" id="line2">
          {/* LEADERS */}
          <div className="form-question">
            <label className='form-label'>Location</label>
            <input type="text" className="form-input" id="location" name="trip_location" value={formData.trip_location} onChange={handleChange} required />
          </div>
          {/* DATE */}
          <div className="form-question">
            <label className='form-label'>Date</label>
            <input type="date" className="form-input" id="date" name="trip_date" value={formData.trip_date} onChange={handleChange} required />
          </div>
        </div>
        {/* LINE 3: TYPE, LEVEL, SUBCLUB, CAP */}
        <div className="shared-line" id="line3">
          {/* TYPE */}
          <div className="form-question">
            <label className='form-label'>Trip Type</label>
            <select name="trip_type" value={formData.trip_type} onChange={handleChange} required className="form-input" id="type">
              {tripTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* CAP */}
          <div className="form-question">
            <label className='form-label'>Capacity</label>
            <input type="number" className="form-input" id="capacity" name="trip_capacity" value={formData.trip_capacity} onChange={handleChange} required />
          </div>
          {/* SUBCLUB */}
          <div className="form-question">
            <label className="form-label">Subclub</label>
            <select name="subclub" value={formData.subclub} onChange={handleChange} required className="form-input" id="subclub">
              <option value="">Select a Subclub</option>
              {subclubs.map(subclub => (
                <option key={subclub.id} value={subclub.id}>{subclub.subclub_name}</option>
              ))}
            </select>
          </div>
          {/* LEVEL */}
          <div className="form-question">
            <label className='form-label'>Trip Level</label>
            <select name="trip_level" value={formData.trip_level} onChange={handleChange} required className="form-input" id="level">
              {tripLevelOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* LINE 4: BRING/PROVIDED */}
        <div className='shared-line' id="line4">
          {/* BRING */}
          <div className="form-question">
            <label className='form-label'>What to Bring</label>
            <textarea className="form-input" id="bring" name="trip_bring" value={formData.trip_bring} onChange={handleChange} />
          </div>
          {/* PROVIDED */}
          <div className="form-question">
            <label className='form-label'>Provided Items</label>
            <textarea className="form-input" id="provided" name="trip_provided" value={formData.trip_provided} onChange={handleChange} />
          </div>
        </div>
        {/* LINE 5: DESCRIPTION */}
        <div id='line5'>
          <div className="form-question">
            <label className='form-label'>Description</label>
            <textarea className="form-input" id="description" name="trip_description" value={formData.trip_description} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="submit-button">Create</button>
        </form>
      </div>
  </div>
  );
};

export default AddTrip;
