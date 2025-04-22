'use client';

import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import styles from './Wishlist.module.css';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className={styles.emptyWishlist}>
        <h1>Your Wishlist is Empty</h1>
        <p>You haven't added any products to your wishlist yet.</p>
        <Link href="/" className={styles.continueShopping}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wishlistContainer}>
      <h1>Your Wishlist</h1>
      <div className={styles.wishlistGrid}>
        {wishlist.map((product) => (
          <div key={product.id} className={styles.wishlistItem}>
            <Link href={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className={styles.productImage} />
            </Link>
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p className={styles.price}>${product.price}</p>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className={styles.removeButton}
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 