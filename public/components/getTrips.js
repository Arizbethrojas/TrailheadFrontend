import React, { useState, useEffect } from 'react';
import { getTrips, createTrip } from '../apiServices/services';

const TripExplore = () => {
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTrips = async () => {
            try {
                const data = await getTrips();
                console.log("data", data);
                setTrips(data);
            } catch (err) {
                setError(err.message);
            }
        };

        loadTrips();
    }, []);

    const handleAddTrip = async () => {
        const newTrip = { title: 'Gile Hike', tripLeader: 'Ari', date: '2024-10-31', attendees: '5' };
        try {
            const createdTrip = await createTrip(newTrip);
            setTrips([...trips, createdTrip]);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Explore Trips</h1>
            {error && <p>Error: {error}</p>}
            <ul>
                {Array.isArray(trips) && trips.map(trip => (
                    <li key={trip.id}>{trip.trip_name} - {trip.trip_leader} on {trip.trip_date}</li>
                ))}
            </ul>
            <button onClick={handleAddTrip}>Add New Trip</button>
        </div>
    );
};

export default TripExplore;
