import axios from 'axios';
export const getTrips = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/trips');
        return response.data;
    } catch (err) {
        console.error('Error getting trips:', err.message);
        throw err;
    }
};

export const createTrip = async (newTrip) => {
    try {
        const response = await axios.post('trips/', newTrip);
        console.log('Your trip is created:', response.data);
        return response.data;
    } catch (err) {
        console.error('Error creating your trip:', err.message);
        throw err;
    }
};

export const updateTrip = async (tripId, updatedTrip) => {
    try {
        const response = await axios.put(`trips/${tripId}/`, updatedTrip);
        console.log('Your trip is updated:', response.data);
        return response.data;
    } catch (err) {
        console.error('Error updating your trip:', err.message);
        throw err;
    }
};

export const deleteTrip = async (tripId) => {
    try {
        await axios.delete(`trips/${tripId}/`);
        console.log('you deleted your trip deleted');
    } catch (err) {
        console.error('Error deleting trip:', err.message);
        throw err;
    }
};
