// Filter.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Filter = ({ filterBySubclub, setFilterBySubclub, filterByLevel, setFilterByLevel }) => {

    const [subclubs, setSubclubs] = useState([]); //hold subclubs from db

    const levels = ["beginner", "intermediate", "advanced"]; //trip levels

    const handleSubclubChange = (event) => {
        setFilterBySubclub(event.target.value); //update selected subclub
    };

    const handleLevelChange = (event) => {
        setFilterByLevel(event.target.value); //update selected level
    };

    useEffect(() => {
        const fetchSubclubs = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/subclubs/');
            setSubclubs(response.data);
        } catch (error){
            console.error('Error fetching subclubs:', error);
        }
        };
        fetchSubclubs();
    }, []);

    return (
        <div className="filters-container">
        <div className="filters">
            {/* subclub */}
            <label>
            Subclub:
            <select value={filterBySubclub} onChange={handleSubclubChange}>
                <option value="">All</option>
                {subclubs.map(subclub => (
                    <option key={subclub.id} value={subclub.id}>
                        {subclub.subclub_name}
                    </option>
                ))}
            </select>
            </label>
            {/* level */}
            <label>
            Level:
            <select value={filterByLevel} onChange={handleLevelChange}>
                <option value="">All</option>
                {levels.map(level => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                ))}
            </select>
            </label>
            {/* <label>
            <input type="checkbox" checked={filterBySignUp} onChange={toggleSignUpFilter} />
            My trips
            </label> */}
        </div>
        </div>
    );
    };

export default Filter;