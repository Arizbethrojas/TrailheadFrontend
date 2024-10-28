// Author: Sammy Rago 
// Purpose: Form to create a new trip
// Date: 10/27

// src/screens/AddTrip.js
import React, { useState } from 'react';
import '../styles/globalStyles.css'; // Import global styles
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../styles/addTrip.css';

const AddTrip = () => {
  const [formData, setFormData] = useState({
    trip_name: '',
    trip_date: '',
    trip_description: '',
    trip_leader: '',
    trip_capacity: 0,
    subclub: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://127.0.0.1:800/trips/create/', formData);
      console.log(response.data);
      navigate('/trips');
    } catch (error){
      console.error('There was an error creating the trip', error);
    }
  };
  return (
    <div className="app-container">
      <div className="add-trip-container">
        <h2 className='add-trip-title'>Plan a Trip</h2>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className="form-question">
            <label className='form-label'>Title</label>
            <input type="text" className="form-input" id="title" name="trip_name" value={formData.trip_name} onChange={handleChange} required />
          </div>
          <div className="shared-line">
            <div className="form-question" id="date-group">
              <label className='form-label'>Date</label>
              <input type="date" className="form-input" id="date" name="trip_date" value={formData.trip_date} onChange={handleChange} required />
            </div>
            <div className="form-question" id="leader-group">
              <label className='form-label'>Trip Leader</label>
              <input type="text" className="form-input" id="leader" name="trip_leader" value={formData.trip_leader} onChange={handleChange} required />
            </div>
          </div>
          <div className="shared-line">
            <div className="form-question" id="capacity-group">
              <label className='form-label'>Capacity</label>
              <input type="number" className="form-input" id="capacity" name="trip_capacity" value={formData.trip_capacity} onChange={handleChange} required />
            </div>
            <div className="form-question" id="subclub-group">
              <label className='form-label'>Subclub</label>
              <input type="text" className="form-input" id="subclub" name="subclub" value={formData.subclub} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-question">
            <label className='form-label'>Description</label>
            <textarea className="form-input" id="description" name="trip_description" value={formData.trip_description} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-button">Create</button>

        </form>
      </div>
    </div>
  );
};

export default AddTrip;