import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import vanImage from "../styles/images/pin.png"; // Import your local icon image
import '../styles/map.css';

const mapContainerStyle = {
  width: "225%",
  height: "600px",
};

const center = { lat: 43.7022, lng: -72.2896 }; // Hanover, NH

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [temporaryMarker, setTemporaryMarker] = useState(null); 

  const handleMapClick = useCallback((event) => {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setTemporaryMarker(position);
    setSelectedPosition(position);
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
      await axios.post("http://localhost:8000/api/markers/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchMarkers();
      setPhoto(null);
      setSelectedPosition(null);
      setTemporaryMarker(null);
    } catch (error) {
      console.error("Error adding marker:", error);
    }
  };

  const fetchMarkers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/markers/");
      setMarkers(response.data);
    } catch (error) {
      console.error("Error fetching markers:", error);
    }
  };

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
              url: marker.image,
              scaledSize: new window.google.maps.Size(180, 180),
            }}
          />
        ))}

        {/* Render the temporary marker */}
        {temporaryMarker && (
          <Marker
            position={temporaryMarker}
            icon={{
              url: vanImage, // Use the local image import
              scaledSize: new window.google.maps.Size(25, 25), // Adjust size as needed
            }}
          />
        )}
      </GoogleMap>

      <div className="photoUploadUI">
        <h2 id="upload-text">Click map to upload photo</h2>
        <div id="photo-buttons">
          <button id="marker-button" onClick={submitMarker}>Submit Marker</button>
          <input id="upload-button" type="file" onChange={handlePhotoUpload} />
        </div>
      </div>
    </div>
  );
}

export default Map;
