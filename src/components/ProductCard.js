'use client';

import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h3>{product.name}</h3>
        <p className={styles.price}>${product.price}</p>
        <div className={styles.actions}>
          <button className={styles.addToCartButton}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
} 