// Filter.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/filters.css'; 

const Filter = ({ filterBySubclub, setFilterBySubclub, filterByLevel, setFilterByLevel }) => {

    // const [subclubs, setSubclubs] = useState([]); //hold subclubs from db
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

    const levels = ["beginner", "intermediate", "advanced"]; //trip levels

    const handleSubclubChange = (event) => {
        setFilterBySubclub(event.target.value); //update selected subclub
    };

    const handleLevelChange = (event) => {
        setFilterByLevel(event.target.value); //update selected level
    };

    // useEffect(() => {
    //     const fetchSubclubs = async () => {
    //     try {
    //         const response = await axios.get('http://127.0.0.1:8000/api/subclubs/');
    //         setSubclubs(response.data);
    //     } catch (error){
    //         console.error('Error fetching subclubs:', error);
    //     }
    //     };
    //     fetchSubclubs();
    // }, []);

    return (
        <div className="filters-container">
        <div className="filters">
            {/* subclub */}
            <label>
            {/* Subclub: */}
            <select value={filterBySubclub} onChange={handleSubclubChange}>
                <option value="">All Subclubs</option>
                {subclubs.map(subclub => (
                    <option key={subclub.id} value={subclub.id}>
                        {subclub.subclub_name}
                    </option>
                ))}
            </select>
            </label>
            {/* level */}
            <label>
            {/* Level: */}
            <select value={filterByLevel} onChange={handleLevelChange}>
                <option value="">All Levels</option>
                {levels.map(level => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                ))}
            </select>
            </label>
        </div>
        </div>
    );
    };

export default Filter;