import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    allergies: "",
    classYear: "",
    pronouns: "",
    isLeader: false,
  });
  const [pfp, setPfp] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFile = (e) => {
    setPfp(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-container">
      <h1>Welcome</h1>
      <p className="sign-in-text">
        Already have an account?{' '}
        <button onClick={() => navigate('/login')}>Sign in</button>
      </p>

      <form onSubmit={handleSubmit}>
        {[
          { name: 'username', label: 'Username', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'password', label: 'Password', type: showPw ? 'text' : 'password' },
          { name: 'allergies', label: 'Allergies (if any)', type: 'text', required: false },
          { name: 'classYear', label: 'Class Year', type: 'number' },
          { name: 'pronouns', label: 'Pronouns', type: 'text', required: false }
        ].map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            <div className="input-wrapper">
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required !== false}
                value={data[field.name]}
                onChange={handleChange}
              />
              {field.name === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="password-toggle"
                >
                  {showPw ? 'Hide' : 'Show'}
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="checkbox-group">
          <input
            id="isLeader"
            name="isLeader"
            type="checkbox"
            checked={data.isLeader}
            onChange={handleChange}
          />
          <label htmlFor="isLeader">I am a trip leader</label>
        </div>

        <div className="file-upload">
          <label htmlFor="pfp">
            <span>Click to upload</span>
            <p>PNG, JPG, GIF up to 10MB</p>
            <input
              id="pfp"
              name="pfp"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFile}
            />
          </label>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <button type="submit">Create account</button>
      </form>
    </div>
  );
};

export default SignUp;