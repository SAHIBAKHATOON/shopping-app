'use client';

import { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { getWishlist, removeFromWishlist, WishlistItem } from '@/utils/wishlist';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    setWishlist(getWishlist());
  };

  return (
    <div className={styles.wishlistSection}>
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className={styles.emptyWishlist}>Your wishlist is empty</p>
      ) : (
        <div className={styles.wishlistItems}>
          {wishlist.map((item) => (
            <div key={item.id} className={styles.wishlistItem}>
              <img src={item.image} alt={item.name} className={styles.wishlistImage} />
              <div className={styles.wishlistItemDetails}>
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 