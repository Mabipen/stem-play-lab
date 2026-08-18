'use client';

import { useEffect } from 'react';
import Button from '@/components/Button';
import styles from '../page.module.css';

export default function CheckoutSuccessPage() {
  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className={`${styles.page} container`}>
      <div className={styles.empty}>
        <h1 className={styles.title}>🎉 Order placed!</h1>
        <p>Thanks for your order. We&apos;ve sent a confirmation email and your order is now being processed.</p>
        <Button href="/account/orders" style={{ marginTop: 'var(--space-5)' }}>View My Orders</Button>
      </div>
    </div>
  );
}
