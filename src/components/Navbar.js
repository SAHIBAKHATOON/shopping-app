'use client';

import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import WishlistIcon from './WishlistIcon';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLinks}>
          <WishlistIcon />
          <ThemeToggle />
          {user ? (
            <button onClick={logout} className={styles.logoutButton}>
              <span className={styles.buttonText}>Logout</span>
              <span className={styles.buttonIcon}>🚪</span>
            </button>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              <span className={styles.buttonText}>Login</span>
              <span className={styles.buttonIcon}>🔑</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 