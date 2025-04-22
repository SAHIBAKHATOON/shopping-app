'use client';

import { useState } from 'react';
import styles from './ColorPalette.module.css';
import RatingButton from './RatingButton';

const colors = [
  { name: 'Coral Red', hex: '#FF6B6B' },
  { name: 'Ocean Blue', hex: '#4ECDC4' },
  { name: 'Sunny Yellow', hex: '#FFE66D' },
  { name: 'Lavender', hex: '#B388FF' },
  { name: 'Mint Green', hex: '#98FF98' },
  { name: 'Peach', hex: '#FFDAB9' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Rose Gold', hex: '#E6B0AA' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Coral', hex: '#FF7F50' },
  { name: 'Lilac', hex: '#C8A2C8' },
  { name: 'Sage', hex: '#BCB88A' },
];

export default function ColorPalette() {
  const [copiedColor, setCopiedColor] = useState(null);
  const [ratings, setRatings] = useState({});

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleRatingChange = (colorHex, rating) => {
    setRatings(prev => ({
      ...prev,
      [colorHex]: rating
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Color Palette</h1>
      <p className={styles.subtitle}>Click on any color to copy its hex code</p>
      <div className={styles.colorGrid}>
        {colors.map((color) => (
          <div
            key={color.hex}
            className={styles.colorCard}
            style={{ backgroundColor: color.hex }}
            onClick={() => copyToClipboard(color.hex)}
          >
            <div className={styles.colorInfo}>
              <span className={styles.colorName}>{color.name}</span>
              <span className={styles.hexCode}>{color.hex}</span>
              <div className={styles.ratingContainer}>
                <RatingButton
                  initialRating={ratings[color.hex] || 0}
                  onRatingChange={(rating) => handleRatingChange(color.hex, rating)}
                />
              </div>
            </div>
            {copiedColor === color.hex && (
              <div className={styles.copyMessage}>Copied!</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 