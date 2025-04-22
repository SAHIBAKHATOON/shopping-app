'use client';

import { useState } from 'react';
import styles from './Checkout.module.css';

export default function Checkout({ cart, totalPrice, onClose }) {
  const [step, setStep] = useState(1);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    }
  });

  const [errors, setErrors] = useState({});

  const validateStep = (stepData) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!stepData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!stepData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!stepData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!stepData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!stepData.address.trim()) newErrors.address = 'Address is required';
      if (!stepData.city.trim()) newErrors.city = 'City is required';
      if (!stepData.state.trim()) newErrors.state = 'State is required';
      if (!stepData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    } else if (step === 2) {
      if (!stepData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(stepData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number';
      }
      if (!stepData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!stepData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(stepData.expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
      }
      if (!stepData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(stepData.cvv)) {
        newErrors.cvv = 'Invalid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

  const handleNext = () => {
    if (validateStep(formData[step === 1 ? 'shipping' : 'payment'])) {
      setStep(prev => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(formData.payment)) {
      // Simulate order processing
      setIsOrderPlaced(true);
      setStep(4); // Move to confirmation step
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>Shipping Information</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.shipping.firstName}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className={errors.firstName ? styles.error : ''}
                />
                {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.shipping.lastName}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className={errors.lastName ? styles.error : ''}
                />
                {errors.lastName && <span className={styles.errorMessage}>{errors.lastName}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.shipping.email}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className={errors.email ? styles.error : ''}
                />
                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.shipping.phone}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className={errors.phone ? styles.error : ''}
                />
                {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.shipping.address}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className={errors.address ? styles.error : ''}
                />
                {errors.address && <span className={styles.errorMessage}>{errors.address}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.shipping.city}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className={errors.city ? styles.error : ''}
                />
                {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.shipping.state}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className={errors.state ? styles.error : ''}
                />
                {errors.state && <span className={styles.errorMessage}>{errors.state}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.shipping.zipCode}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  className={errors.zipCode ? styles.error : ''}
                />
                {errors.zipCode && <span className={styles.errorMessage}>{errors.zipCode}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Country</label>
                <select
                  name="country"
                  value={formData.shipping.country}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>Payment Information</h2>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.payment.cardNumber}
                  onChange={(e) => handleInputChange(e, 'payment')}
                  placeholder="1234 5678 9012 3456"
                  className={errors.cardNumber ? styles.error : ''}
                />
                {errors.cardNumber && <span className={styles.errorMessage}>{errors.cardNumber}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.payment.cardName}
                  onChange={(e) => handleInputChange(e, 'payment')}
                  className={errors.cardName ? styles.error : ''}
                />
                {errors.cardName && <span className={styles.errorMessage}>{errors.cardName}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.payment.expiryDate}
                  onChange={(e) => handleInputChange(e, 'payment')}
                  placeholder="MM/YY (e.g., 12/25)"
                  className={errors.expiryDate ? styles.error : ''}
                />
                {errors.expiryDate ? (
                  <span className={styles.errorMessage}>{errors.expiryDate}</span>
                ) : (
                  <span className={styles.helperText}>Enter expiry date in MM/YY format (e.g., 12/25)</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.payment.cvv}
                  onChange={(e) => handleInputChange(e, 'payment')}
                  placeholder="123"
                  className={errors.cvv ? styles.error : ''}
                />
                {errors.cvv && <span className={styles.errorMessage}>{errors.cvv}</span>}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>Order Summary</h2>
            <div className={styles.orderSummary}>
              <div className={styles.summaryItems}>
                {cart.map(item => (
                  <div key={item.id} className={styles.summaryItem}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className={styles.shippingInfo}>
              <h3>Shipping Address</h3>
              <p>
                {formData.shipping.firstName} {formData.shipping.lastName}<br />
                {formData.shipping.address}<br />
                {formData.shipping.city}, {formData.shipping.state} {formData.shipping.zipCode}<br />
                {formData.shipping.country}
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={styles.stepContent}>
            <div className={styles.confirmationContainer}>
              <div className={styles.confirmationIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                </svg>
              </div>
              <h2>Order Confirmed!</h2>
              <p className={styles.confirmationMessage}>
                Thank you for your purchase. Your order has been successfully placed.
              </p>
              <div className={styles.orderDetails}>
                <h3>Order Details</h3>
                <div className={styles.orderInfo}>
                  <p>Order Number: <span>#{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span></p>
                  <p>Estimated Delivery: <span>{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span></p>
                </div>
              </div>
              <button
                className={styles.continueShoppingButton}
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.checkoutModal}>
      <div className={styles.checkoutContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.steps}>
          <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
            <span className={styles.stepNumber}>1</span>
            <span className={styles.stepLabel}>Shipping</span>
          </div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
            <span className={styles.stepNumber}>2</span>
            <span className={styles.stepLabel}>Payment</span>
          </div>
          <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
            <span className={styles.stepNumber}>3</span>
            <span className={styles.stepLabel}>Review</span>
          </div>
          <div className={`${styles.step} ${step >= 4 ? styles.active : ''}`}>
            <span className={styles.stepNumber}>4</span>
            <span className={styles.stepLabel}>Confirm</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {renderStep()}
          
          <div className={styles.buttons}>
            {step > 1 && step < 4 && (
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setStep(prev => prev - 1)}
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={handleNext}
              >
                Next
              </button>
            ) : step === 3 ? (
              <button
                type="submit"
                className={styles.submitButton}
              >
                Place Order
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
} 