import React from 'react';
import { Link } from 'react-router-dom';
import './TopSpace.css';
import natureImage from './images/nature.png';
import personIcon from './images/person.png';

const TopSpace = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting = '';
  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <div className="top-space">
      <div className="greeting">{greeting}</div>
      <div className="image-container">
        <Link to="/me">
          <img src={personIcon} alt="Person Icon" />
        </Link>
      </div>
      <div className="image-container">
        <img src={natureImage} alt="Nature Image" />
      </div>
    </div>
  );
};

export default TopSpace;
