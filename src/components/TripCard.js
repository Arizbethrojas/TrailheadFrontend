import React from 'react';
import './tripCard.css';

// Import images (if needed for upcoming trips)
import rumneyImage from '../styles/images/rumney.webp';
import dmcImage from '../styles/images/climber.webp';
import ledyardImage from '../styles/images/ledyard.jpg';
import cntImage from '../styles/images/cnt.jpg';
import wscImage from '../styles/images/wsc.jpg';
import clubskiImage from '../styles/images/skier.webp';
import fnfImage from '../styles/images/fnf.jpg';

const subclubImages = {
  "Mountaineering": dmcImage,
  "Cabin & Trail": cntImage,
  "Ledyard": ledyardImage,
  "VHOC": fnfImage,
  "Flora & Fauna": fnfImage,
  "Winter Sports": wscImage,
  "Nordic Skiing": clubskiImage,
  "Club Ski": clubskiImage,
  "Climbing Team": dmcImage,
  "Surf": ledyardImage,
};

const TripCard = ({ title, date, subclub, width = 300, height = 200, showImage = true }) => {
  const imageSrc = subclubImages[subclub] || 'path/to/default_image.jpg';

  return (
    <div className="trip-card" style={{ width, height }}>
      {showImage && (
        <div 
          className="trip-image" 
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>
      )}
      <div className="trip-title">{title}</div>
      <div className="trip-info">
        <span className="trip-date">{date}</span> {/* Date will be inline */}
      </div>
    </div>
  );
};

export default TripCard;