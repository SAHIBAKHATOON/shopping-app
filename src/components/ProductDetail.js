'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './ProductDetail.module.css';

export default function ProductDetail({ product }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Use a single image for now since we don't have multiple images
  const galleryImages = [product.image];

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
      // Add to cart logic here
    }, 1000);
  };

  return (
    <div className={styles.productDetailContainer}>
      <button className={styles.backButton} onClick={() => router.back()}>
        ← Back to Shop
      </button>

      <div className={styles.productContent}>
        <div className={styles.gallerySection}>
          <div className={styles.mainImage}>
            <Image
              src={galleryImages[selectedImage]}
              alt={product.name}
              fill
              className={styles.productImage}
              priority
              unoptimized
            />
          </div>
          <div className={styles.thumbnailGallery}>
            {galleryImages.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  className={styles.thumbnailImage}
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.productHeader}>
            <span className={styles.categoryBadge}>{product.category}</span>
            <h1 className={styles.productTitle}>{product.name}</h1>
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? styles.filled : ''}>
                    ★
                  </span>
                ))}
              </div>
              <span className={styles.ratingValue}>{product.rating}</span>
            </div>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <div className={styles.quantitySelector}>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.description}>
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className={styles.features}>
            <h2>Features</h2>
            <ul>
              <li>High-quality materials and construction</li>
              <li>Advanced technology integration</li>
              <li>User-friendly interface</li>
              <li>Long-lasting battery life</li>
              <li>Compatible with all major platforms</li>
            </ul>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.addToCartButton} ${isAddingToCart ? styles.loading : ''}`}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
            <button className={styles.buyNowButton}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className={styles.specifications}>
        <h2>Specifications</h2>
        <div className={styles.specsGrid}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Brand</span>
            <span className={styles.specValue}>TechPro</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Model</span>
            <span className={styles.specValue}>{product.name.replace(/\s+/g, '')}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Warranty</span>
            <span className={styles.specValue}>2 Years</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Color</span>
            <span className={styles.specValue}>Black</span>
          </div>
        </div>
      </div>
    </div>
  );
} 