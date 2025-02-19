import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleChange = async (event) => {
    event.preventDefault();
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePfp = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signUpData = new FormData();
    signUpData.append("username", formData.username);
    signUpData.append("email", formData.email);
    signUpData.append("password", formData.password);
    signUpData.append("allergies", formData.allergies);
    signUpData.append("class_year", formData.classYear);
    signUpData.append("pronouns", formData.pronouns);
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
        const { access, refresh } = response.data;
        setAuthToken(access);
        console.log("Signup successful!");
        onSignUp();
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
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="allergies"
          placeholder="Allergies (if any)"
          value={formData.allergies}
          onChange={handleChange}
        />
        <input
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
          type="text"
          name="pronouns"
          placeholder="Pronouns (e.g., they/them, she/her)"
          value={formData.pronouns}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="tripLeader"
            checked={formData.tripLeader}
            onChange={handleChange}
          />
          I am a trip leader
        </label>

        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handlePfp}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ marginTop: '20px' }}>
            Sign Up!
        </button>
        <button 
          type="button" 
          onClick={handleBackToLogin} 
          style={{ marginTop: '10px', backgroundColor: '#f0f0f0' }}
        >
          return to login
        </button>
      </form>
    </div>
  );
};

export default SignUpIndividual;