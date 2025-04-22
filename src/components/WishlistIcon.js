'use client';

import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import styles from './WishlistIcon.module.css';

export default function WishlistIcon() {
  const { wishlist } = useWishlist();

  return (
    <Link href="/wishlist" className={styles.wishlistIcon}>
      <span className={styles.icon}>❤️</span>
      {wishlist.length > 0 && (
        <span className={styles.count}>{wishlist.length}</span>
      )}
    </Link>
  );
} 