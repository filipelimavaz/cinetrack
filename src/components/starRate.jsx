import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/StarRate.css';

export default function StarRate({ rate, onRate }) {
  const [hover, setHover] = useState(null);

  const handleMouseMove = (event, starValue) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const isHalf = x < width / 2;
    setHover(isHalf ? starValue - 0.5 : starValue);
  };

  const handleClick = (event, starValue) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const isHalf = x < width / 2;
    onRate(isHalf ? (starValue - 0.5) * 2 : starValue * 2);
  };

  const displayValue = hover !== null ? hover : rate / 2;

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => {
        let fill = 0;
        if (displayValue >= star) {
          fill = 100;
        } else if (displayValue >= star - 0.5) {
          fill = 50;
        }

        return (
          <div
            key={star}
            className="star-container"
            onMouseMove={(e) => handleMouseMove(e, star)}
            onMouseLeave={() => setHover(null)}
            onClick={(e) => handleClick(e, star)}
          >
            <div className="star-background">
              <FaStar size={50} />
            </div>
            <div className="star-foreground" style={{ width: `${fill}%` }}>
              <FaStar size={50} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
