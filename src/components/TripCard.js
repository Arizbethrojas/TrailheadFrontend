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

const subclubs = [
  {id:'1', 'subclub_name':'VHOC'},
  {id:'2', 'subclub_name':'Winter Sports'},
  {id:'3', 'subclub_name':'Flora & Fauna'},
  {id:'4', 'subclub_name':'Cabin & Trail'},
  {id:'5', 'subclub_name':'Mountaineering'},
  {id:'6', 'subclub_name':'Nordic Skiing'},
  {id:'7', 'subclub_name':'Climbing Team'},
  {id:'8', 'subclub_name':'Ledyard'},
  {id:'9', 'subclub_name':'POCO'},
]

const subclubImages = {
  "5": dmcImage, //mountaineering
  "4": cntImage, //cnt
  "8": ledyardImage, //ledyard
  "1": fnfImage, //VHOC
  "3": fnfImage,  //FNF
  "2": wscImage,  //winter sports
  "6": clubskiImage, //nordic
  // "Club Ski": clubskiImage, //club ski
  "7": dmcImage, //climbing
  "9": ledyardImage, //POCO
};

const TripCard = ({ title, date, subclub, width = 300, height = 200, showImage = true }) => {
  
  // workaround to determine if we are looking at subclub name or ID
  let subclubId;
  
  if (typeof subclub === 'number' || (typeof subclub === 'string' && !isNaN(subclub))) {
    // if subclub is an ID 
    subclubId = String(subclub);
  } else if (typeof subclub === 'object' && subclub) {
    // if subclub is an object
    subclubId = String(subclub.id);
  } else if (typeof subclub === 'string') {
    // if subclub is a name, find matching ID
    const matchingSubclub = subclubs.find(sc => sc.subclub_name === subclub);
    subclubId = matchingSubclub ? String(matchingSubclub.id) : null;
  }
  
  // get image
  const imageSrc = subclubId && subclubImages[subclubId] 
    ? subclubImages[subclubId] 
    : 'path/to/default_image.jpg';

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
        <span className="trip-date">{date}</span>
      </div>
    </div>
  );
};

export default TripCard;