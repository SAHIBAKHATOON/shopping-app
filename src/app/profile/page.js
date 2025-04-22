'use client';

import { useUser } from '@/context/UserContext';
import styles from './Profile.module.css';

export default function Profile() {
  const { user, orders, loading } = useUser();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>My Profile</h1>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user?.name.charAt(0)}
          </div>
          <div className={styles.userDetails}>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <p>Member since {new Date(user?.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className={styles.orderHistory}>
        <h2>Order History</h2>
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className={styles.orderDate}>
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`${styles.orderStatus} ${styles[order.status.toLowerCase()]}`}>
                  {order.status}
                </span>
              </div>
              
              <div className={styles.orderItems}>
                {order.items.map((item, index) => (
                  <div key={index} className={styles.orderItem}>
                    <span>{item.name}</span>
                    <span>x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className={styles.orderTotal}>
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 