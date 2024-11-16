import React, {useState} from 'react';
import '../styles/TripPage.css';
import axios from 'axios';

const TripPage = ({ trip, onBack, studentID=2 }) => {
    const getCookie = (name) =>{
        let cookieValue = null;
        if (document.cookie && document.cookie !== ''){
          const cookies = document.cookie.split(';');
          for(let i = 0; i < cookies.length; i++){
            const cookie = cookies[i].trim();
            if(cookie.substring(0, name.length + 1) === (name + '=')){
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue
      }

    const [error, setError] = useState(null)
    const handleSignUp = async () => {
        const token = getCookie('csrftoken'); //obtain csrf token
        console.log('signup TripPage')
        try{
          const response = await axios.post('http://127.0.0.1:8000/api/register_trip/', {
            student_id: studentID,
            trip_id: trip.id,
          },
          {headers: {
            'X-CSRFToken': token,
            'Content-Type': 'application/json',
          },}
        );
    
          if (response.status === 201){
            alert(response.data.message);
            onBack();
          }
        } catch (err){
          setError(err.response ? err.response.data.error: 'Error signing up')
        }
      };

  return (
    <div className="min-h-screen">
      {/* Banner Image */}
      <div className="banner-container">
            <img 
        src="/mountain_background.png" 
        alt="Mountain landscape with fall colors" 
        className="banner-image"
        />
      </div>

      {/* Back Button */}
      <button onClick={onBack} className="back-button">
        ← Back
      </button>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Title */}
        <h1 className="trip-title">{trip.trip_name}</h1>

        {/* Tags */}
        <div className="tags-container">
          <span className="tag">{trip.trip_type}</span>
          <span className="tag">{trip.trip_level}</span>
          <span className="tag">{trip.subclub}</span>
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
          <button className="signup-button" onClick={handleSignUp}>
            Sign Up!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripPage;