//maps.js:
import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
 width: "225%",
 height: "630px",
};

const center = { lat: 43.7022, lng: -72.2896 }; // Hanover, NH

function Map() {

const apiUrl = process.env.REACT_APP_API_URL;
 const { isLoaded, loadError } = useLoadScript({
   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Secure API key using .env
 });

 const [markers, setMarkers] = useState([]);
 const [photo, setPhoto] = useState(null);
 const [selectedPosition, setSelectedPosition] = useState(null); // Store selected position for marker

 const handleMapClick = useCallback((event) => {
   setSelectedPosition({
     lat: event.latLng.lat(),
     lng: event.latLng.lng(),
   });
 }, []);

 const handlePhotoUpload = (e) => {
   const file = e.target.files[0];
   if (file) {
     setPhoto(file);
   }
 };

 const submitMarker = async () => {
   if (!selectedPosition || !photo) {
     alert("Please click on the map and upload a photo!");
     return;
   }

   const formData = new FormData();
   formData.append("latitude", selectedPosition.lat);
   formData.append("longitude", selectedPosition.lng);
   formData.append("image", photo);

   try {
     // Replace with your API endpoint to store the marker
     await axios.post(`${apiUrl}/api/markers/`, formData, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     });

     // Fetch the updated markers after adding a new one
     fetchMarkers();
     setPhoto(null); // Reset the photo input
     setSelectedPosition(null); // Reset the selected position
   } catch (error) {
     console.error("Error adding marker:", error);
   }
 };

 // Fetch markers from the backend
 const fetchMarkers = async () => {
   try {
     const response = await axios.get(`${apiUrl}/api/markers/`);
     setMarkers(response.data); // Update markers state with fetched data
   } catch (error) {
     console.error("Error fetching markers:", error);
   }
 };

 // Load markers when the map is loaded
 useEffect(() => {
   if (isLoaded) {
     fetchMarkers();
   }
 }, [isLoaded]);

 if (loadError) {
   return <p>Error loading maps</p>;
 }
 if (!isLoaded) {
   return <p>Loading maps...</p>;
 }

 return (
   <div>
     <h1>See where other trips have gone!</h1>
     <GoogleMap
       mapContainerStyle={mapContainerStyle}
       zoom={12}
       center={center}
       onClick={handleMapClick}
     >
       {markers.map((marker) => (
         <Marker
           key={marker.id}
           position={{ lat: marker.latitude, lng: marker.longitude }}
           icon={{
             url: marker.image, // Display the image as the marker icon
             scaledSize: new window.google.maps.Size(180, 180), // Adjust the size if needed
           }}
         />
       ))}
     </GoogleMap>
    
     {/* Photo upload UI - Always displayed */}
     <div>
       <h3>Add Photo for Marker</h3>
       <input type="file" onChange={handlePhotoUpload} />
       <button onClick={submitMarker}>Submit Marker</button>
       {selectedPosition && <p>Position selected: {`${selectedPosition.lat}, ${selectedPosition.lng}`}</p>}
     </div>
   </div>
 );
}

export default Map;