import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/StarRate.css';

export default function StarRate({ rate, onRate, readonly = false, size = '50px' }) {
  const [hover, setHover] = useState(null);

  const handleMouseMove = (event, starValue) => {
    if (readonly) return;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const isHalf = x < width / 2;
    setHover(isHalf ? starValue - 0.5 : starValue);
  };

  const handleClick = (event, starValue) => {
    if (readonly) return;
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
            style={{ width: size, height: size }} // Estabelecendo tamanho variável aqui
          >
            <div className="star-background">
              <FaStar size={parseInt(size)} />
            </div>
            <div className="star-foreground" style={{ width: `${fill}%` }}>
              <FaStar size={parseInt(size)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
