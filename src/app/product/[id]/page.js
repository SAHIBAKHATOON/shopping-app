'use client';

import { useEffect, useState } from 'react';
import { products } from '@/components/Shop';
import styles from './product.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProductPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const productId = parseInt(params.id);
    if (isNaN(productId)) {
      router.push('/');
      return;
    }

    const foundProduct = products.find(p => p.id === productId);
    if (!foundProduct) {
      router.push('/');
      return;
    }

    setProduct(foundProduct);
    setLoading(false);
  }, [params.id, router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className={styles.productDetailContainer}>
      <button className={styles.backButton} onClick={() => router.back()}>
        ← Back to Shop
      </button>

      <div className={styles.productContent}>
        <div className={styles.gallerySection}>
          <div className={styles.mainImage}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={styles.productImage}
              priority
              unoptimized
            />
          </div>
          <div className={styles.thumbnailGallery}>
            <button
              className={`${styles.thumbnail} ${selectedImage === 0 ? styles.active : ''}`}
              onClick={() => setSelectedImage(0)}
            >
              <Image
                src={product.image}
                alt={`${product.name} - View 1`}
                fill
                className={styles.thumbnailImage}
                unoptimized
              />
            </button>
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
            <button className={styles.addToCartButton}>
              Add to Cart
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