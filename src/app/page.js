'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Home.module.css';

export default function Home() {
  const [hovered, setHovered] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
      category: "Electronics",
      rating: 4.8
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
      category: "Electronics",
      rating: 4.6
    },
    {
      id: 3,
      name: "Wireless Earbuds Pro",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1606220588911-5117e765b5a1?w=600&h=400&fit=crop",
      category: "Electronics",
      rating: 4.7
    }
  ];

  const categories = [
    { name: "Electronics", icon: "📱", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop" },
    { name: "Fashion", icon: "👕", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop" },
    { name: "Home & Kitchen", icon: "🏠", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop" },
    { name: "Beauty", icon: "💄", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop" }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Welcome to Our <span className={styles.highlight}>E-commerce</span> Store
        </h1>
        <p className={styles.subtitle}>
          Discover amazing products at unbeatable prices
        </p>
        <Link 
          href="/shop"
          className={styles.ctaButton}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Start Shopping
          <span className={`${styles.arrow} ${hovered ? styles.arrowHover : ''}`}>
            →
          </span>
        </Link>
      </div>

      {/* Categories Section */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link 
              key={category.name} 
              href={`/shop?category=${category.name.toLowerCase()}`}
              className={styles.categoryCard}
            >
              <div className={styles.categoryImage}>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={300}
                  className={styles.image}
                />
              </div>
              <div className={styles.categoryContent}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h3>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredProducts}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <div className={styles.productMeta}>
                  <span className={styles.rating}>⭐ {product.rating}</span>
                  <span className={styles.price}>${product.price}</span>
                </div>
                <Link 
                  href={`/product/${product.id}`}
                  className={styles.viewButton}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className={styles.specialOffers}>
        <div className={styles.offerContent}>
          <h2>Special Summer Sale</h2>
          <p>Get up to 50% off on selected items</p>
          <Link href="/shop?discount=true" className={styles.offerButton}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <h2>Fast Delivery</h2>
          <p>Get your products delivered within 2-3 business days</p>
        </div>
        <div className={styles.featureCard}>
          <h2>Secure Payments</h2>
          <p>Shop with confidence using our secure payment system</p>
        </div>
        <div className={styles.featureCard}>
          <h2>24/7 Support</h2>
          <p>Our customer support team is always here to help</p>
        </div>
      </div>
    </div>
  );
}
