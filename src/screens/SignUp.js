import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/signUp.css'; 

const SignUpIndividual = ({ onSignUp, setAuthToken }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    allergies: "",
    classYear: "",
    pronouns: "",
    tripLeader: false,
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePfp = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signUpData = new FormData();
    const username = formData.username;
    console.log('first username', username);
    const password = formData.password;
    console.log('first pw', password);
    signUpData.append("username", formData.username);
    signUpData.append("email", formData.email);
    signUpData.append("password", formData.password);
    signUpData.append("allergies", formData.allergies);
    signUpData.append("class_year", formData.classYear);
    signUpData.append("pronouns", formData.pronouns);
    console.log('Trip Leader:', formData.tripLeader);
    signUpData.append("trip_leader", formData.tripLeader);
    if (profilePicture) {
        signUpData.append("profile_picture", profilePicture);
    }
    if (isSignUp) {
        try {
        const response = await axios.post("http://127.0.0.1:8000/api/register/", signUpData, {
            headers: {
                "Content-Type": "multipart/form-data",
              }, 
        });
        console.log('user: ', username, "pw: ", password);
        console.log('response.data', response.data.access_token);
        const token = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
        console.log('token', token);
        const { access, refresh } = token.data;
        console.log('access', access);
        // setAuthToken(access);
        console.log("Signup successful!");
        console.log('su access', access)
        onSignUp(access);
        navigate("/trips");
        } catch (err) {
        console.error("Signup failed:", err.response ? err.response.data : err.message);
        setError("FAIL FAIL BIG FAIL");
        }
    }
  };

  const handleBackToLogin = () => {
    navigate("/login"); 
  };

  return (
    <div className="sui-container">
      <h2 className="sui-title">Sign Up</h2>
      <form className="sui-form" onSubmit={handleSubmit}>
        <input
          className="sui-input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="sui-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="sui-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className="sui-input"
          type="text"
          name="allergies"
          placeholder="Allergies (if any)"
          value={formData.allergies}
          onChange={handleChange}
        />
        <input
          className="sui-input"
          type="number"
          name="classYear"
          placeholder="Class Year (4-digit)"
          value={formData.classYear}
          onChange={handleChange}
          required
          min="1900"
          max="2100"
        />
        <input
          className="sui-input"
          type="text"
          name="pronouns"
          placeholder="Pronouns (e.g., they/them, she/her)"
          value={formData.pronouns}
          onChange={handleChange}
        />

        <div className="sui-checkbox-container">
          <input
            className="sui-checkbox"
            type="checkbox"
            name="tripLeader"
            id="tripLeaderCheckbox"
            checked={formData.tripLeader}
            onChange={handleChange}
          />
          <label className="sui-checkbox-label" htmlFor="tripLeaderCheckbox">
            I am a trip leader
          </label>
        </div>

        <p className="sui-upload-text"> 
          Upload Profile Photo (.jpg accepted)
        </p>

        <input
          className="sui-file-input"
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handlePfp}
        />

        {error && <p className="sui-error-message">{error}</p>}

        <button className="sui-button sui-primary-button" type="submit">
          Sign Up!
        </button>
        <button 
          className="sui-button sui-secondary-button"
          type="button" 
          onClick={handleBackToLogin}
        >
          Return to Login
        </button>
      </form>
    </div>
  );
};

export default SignUpIndividual;