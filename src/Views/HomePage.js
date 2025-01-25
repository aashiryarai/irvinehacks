// src/Views/HomePage.js
import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
    const [isBlue, setIsBlue] = useState(false);

    const toggleColor = () => {
        setIsBlue(!isBlue);
    };

    return (
        <div className="cafe-homepage">
            <h1>Welcome to my website</h1>
            <p>hehehehehe</p>
            <div className={`cafe-color-box ${isBlue ? 'cafe-blue' : 'cafe-red'}`}></div>
            <button className="cafe-button" onClick={toggleColor}>Change Color</button>
        </div>
    );
};

export default HomePage;