'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWishlist } from '@/context/WishlistContext';
import styles from './Shop.module.css';
import ShopSkeleton from './ShopSkeleton';
import Checkout from './Checkout';

export const products = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 299.99,
    image: '/products/headphones.jpg',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Audio',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: '/products/smartwatch.jpg',
    description: 'Feature-rich smartwatch with health monitoring',
    category: 'Wearables',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Wireless Earbuds',
    price: 149.99,
    image: '/products/earbuds.jpg',
    description: 'True wireless earbuds with long battery life',
    category: 'Audio',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Laptop Stand',
    price: 49.99,
    image: '/products/laptop-stand.jpg',
    description: 'Ergonomic laptop stand for better posture',
    category: 'Accessories',
    rating: 4.5,
  }
];

export default function Shop() {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [cart, setCart] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProductClick = (product) => {
    router.push(`/product/${product.id}`);
  };

  const handleDragStart = (e, product) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(product));
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const productData = e.dataTransfer.getData('text/plain');
    const product = JSON.parse(productData);
    addToCart(product);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setIsCartOpen(false);
  };

  const handleWishlistClick = (e, product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (isLoading) {
    return <ShopSkeleton />;
  }

  return (
    <div className={styles.shopContainer}>
      <div className={styles.shopContent}>
        <div className={styles.header}>
          <h1 className={styles.shopTitle}>Discover Our Products</h1>
          <p className={styles.shopSubtitle}>Find the perfect tech companion for your lifestyle</p>
        </div>

        <div className={styles.categories}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategory : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`${styles.productCard} ${
                hoveredProduct === product.id ? styles.productCardHovered : ''
              } ${isDragging ? styles.dragging : ''}`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick(product)}
              draggable
              onDragStart={(e) => handleDragStart(e, product)}
              onDragEnd={handleDragEnd}
              style={{ cursor: 'grab' }}
            >
              <div className={styles.productBadge}>{product.category}</div>
              <button
                className={`${styles.wishlistButton} ${isInWishlist(product.id) ? styles.wishlistActive : ''}`}
                onClick={(e) => handleWishlistClick(e, product)}
                title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isInWishlist(product.id) ? '❤️' : '🤍'}
              </button>
              <div className={styles.productImageContainer}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={styles.productImage}
                  unoptimized
                  priority={product.id === 1}
                />
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productHeader}>
                  <h2 className={styles.productName}>{product.name}</h2>
                  <div className={styles.rating}>
                    <span>★</span>
                    <span>{product.rating}</span>
                  </div>
                </div>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productActions}>
                  <span className={styles.productPrice}>${product.price}</span>
                  <button
                    className={styles.addToCartButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div 
            className={`${styles.cartContainer} ${isCartOpen ? styles.cartOpen : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className={styles.cartHeader}>
              <h2 className={styles.cartTitle}>
                <svg className={styles.cartIcon} viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Your Shopping Cart
                <span className={styles.cartCount}>{getTotalItems()} items</span>
              </h2>
              <button 
                className={styles.closeCartButton}
                onClick={() => setIsCartOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.cartItemInfo}>
                    <span className={styles.cartItemName}>{item.name}</span>
                    <span className={styles.cartItemCategory}>{item.category}</span>
                  </div>
                  <div className={styles.cartItemActions}>
                    <div className={styles.quantitySelector}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      className={styles.removeItemButton}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <svg className={styles.removeIcon} viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.cartTotal}>
              <div className={styles.totalRow}>
                <span>Subtotal:</span>
                <span className={styles.totalAmount}>${getTotalPrice().toFixed(2)}</span>
              </div>
              <button 
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <svg className={styles.arrowIcon} viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {cart.length > 0 && !isCartOpen && (
          <button 
            className={styles.openCartButton}
            onClick={() => setIsCartOpen(true)}
          >
            <svg className={styles.cartIcon} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className={styles.cartCount}>{getTotalItems()}</span>
          </button>
        )}

        {showCheckout && (
          <Checkout
            cart={cart}
            totalPrice={getTotalPrice()}
            onClose={() => setShowCheckout(false)}
          />
        )}
      </div>
    </div>
  );
} 