'use client';

import Image from "next/image";
import Link from "next/link";
import styles from './Home.module.css';
import ColorPalette from '@/components/ColorPalette';

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 199.99,
      image: "https://picsum.photos/seed/headphones/600/400",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 149.99,
      image: "https://picsum.photos/seed/smartwatch/600/400",
      category: "Electronics"
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 89.99,
      image: "https://picsum.photos/seed/earbuds/600/400",
      category: "Electronics"
    }
  ];

  const categories = [
    { name: "Electronics", icon: "📱" },
    { name: "Fashion", icon: "👕" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Beauty", icon: "💄" }
  ];

  return (
    <div className={styles.homeContainer}>
      <ColorPalette />
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to Our Online Store</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link href="/shop" className={styles.shopNowButton}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <h2>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link 
              key={category.name} 
              href={`/shop?category=${category.name.toLowerCase()}`}
              className={styles.categoryCard}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredProducts}>
        <h2>Featured Products</h2>
        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className={styles.image}
                  priority
                />
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
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
          <h2>Special Offers</h2>
          <p>Get 20% off on your first purchase</p>
          <Link href="/shop" className={styles.claimButton}>
            Claim Offer
          </Link>
        </div>
      </section>
    </div>
  );
}
