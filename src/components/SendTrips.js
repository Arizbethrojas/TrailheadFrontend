import React, { useState } from 'react';
import axios from '../apiServices/axiosDefault';

const SendTripData = () => {
    const [tripName, setTripName] = useState('');
    const [tripDate, setTripDate] = useState('');
    const [tripDescription, setTripDescription] = useState('');
    const [tripLeader, setTripLeader] = useState('');
    const [tripCapacity, setTripCapacity] = useState('');
    const [subclubId, setSubclubId] = useState(''); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newTrip = {
            trip_name: tripName,
            trip_date: tripDate,
            trip_description: tripDescription,
            trip_leader: tripLeader,
            trip_capacity: parseInt(tripCapacity), 
            subclub: subclubId,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/trips/', newTrip); // Send data to 'trips/' endpoint
            setSuccess('You created a trip successfully');
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    return (
        <div>
            <h1>Create a New Trip</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={tripName} onChange={(e) => setTripName(e.target.value)} placeholder="Trip Name" required />
                <input type="date" value={tripDate} onChange={(e) => setTripDate(e.target.value)} required />
                <textarea value={tripDescription} onChange={(e) => setTripDescription(e.target.value)} placeholder="Trip Description" required />
                <input type="text" value={tripLeader} onChange={(e) => setTripLeader(e.target.value)} placeholder="Trip Leader" required />
                <input type="number" value={tripCapacity} onChange={(e) => setTripCapacity(e.target.value)} placeholder="Trip Capacity" required />
                <input type="text" value={subclubId} onChange={(e) => setSubclubId(e.target.value)} placeholder="Subclub ID" required /> {/* Get the ID of an existing Subclub */}
                <button type="submit">Create Trip</button>
            </form>
            {error && <div>Error: {error}</div>}
            {success && <div>{success}</div>}
        </div>
    );
};

export default SendTripData;
