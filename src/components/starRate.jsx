import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/StarRate.css';

export default function StarRate() {
  const [rate,  setRate]  = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <label key={star}>
          <input
            type="radio"
            name="rating"
            value={star}
            onClick={() => setRate(star)}
            style={{ display: 'none' }}
          />
          <FaStar
            className="star"
            size={50}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            color={star <= (hover || rate) ? '#f5eb3b' : '#ccc'}
          />
        </label>
      ))}
    </div>
  );
}
