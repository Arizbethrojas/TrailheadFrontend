import React, { useState } from 'react';
import axios from '../apiServices/axiosDefault';

const SendTripData = () => {
    const [title, setTitle] = useState('');
    const [tripLeader, setTripLeader] = useState('');
    const [date, setDate] = useState('');
    const [attendees, setAttendees] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newTrip = {
            title,
            tripLeader,
            date,
            attendees,
        };

        try {
            const response = await axios.post('trips/', newTrip); // Send data to 'trips/' endpoint
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
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input type="text" value={tripLeader} onChange={(e) => setTripLeader(e.target.value)} placeholder="Trip Leader" required />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="text" value={attendees} onChange={(e) => setAttendees(e.target.value)} placeholder="Attendees" required />
                <button type="finish">Create Trip</button>
            </form>
            {error && <div>Error: {error}</div>}
            {success && <div>{success}</div>}
        </div>
    );
};

export default SendTripData;
