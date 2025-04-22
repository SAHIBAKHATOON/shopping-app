'use client';

import { useState } from 'react';
import styles from './RatingButton.module.css';

export default function RatingButton({ initialRating = 0, onRatingChange, compact = false }) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className={`${styles.ratingContainer} ${compact ? styles.compact : ''}`}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`${styles.star} ${
              value <= (hoverRating || rating) ? styles.active : ''
            }`}
            onClick={() => handleRating(value)}
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`Rate ${value} out of 5`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.starIcon}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        ))}
      </div>
      {!compact && (
        <span className={styles.ratingText}>
          {rating > 0 ? `${rating} ${rating === 1 ? 'star' : 'stars'}` : 'Rate this'}
        </span>
      )}
    </div>
  );
} 