'use client';

import styles from './Shop.module.css';

export default function ShopSkeleton() {
  return (
    <div className={styles.shopContainer}>
      <div className={styles.shopContent}>
        <div className={styles.header}>
          <div className={`${styles.shopTitle} ${styles.skeleton}`} style={{ width: '300px', height: '40px' }} />
          <div className={`${styles.shopSubtitle} ${styles.skeleton}`} style={{ width: '400px', height: '24px', marginTop: '8px' }} />
        </div>

        <div className={styles.categories}>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`${styles.categoryButton} ${styles.skeleton}`}
              style={{ width: '100px', height: '36px' }}
            />
          ))}
        </div>
        
        <div className={styles.productsGrid}>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={styles.productCard}
            >
              <div className={`${styles.productBadge} ${styles.skeleton}`} style={{ width: '80px', height: '24px' }} />
              <div className={`${styles.productImageContainer} ${styles.skeleton}`} style={{ height: '200px' }} />
              <div className={styles.productInfo}>
                <div className={styles.productHeader}>
                  <div className={`${styles.productName} ${styles.skeleton}`} style={{ width: '150px', height: '24px' }} />
                  <div className={`${styles.rating} ${styles.skeleton}`} style={{ width: '60px', height: '20px' }} />
                </div>
                <div className={`${styles.productDescription} ${styles.skeleton}`} style={{ width: '100%', height: '40px' }} />
                <div className={styles.productActions}>
                  <div className={`${styles.productPrice} ${styles.skeleton}`} style={{ width: '80px', height: '24px' }} />
                  <div className={`${styles.addToCartButton} ${styles.skeleton}`} style={{ width: '120px', height: '36px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 