'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { apiPost, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { Product, CheckoutResponse } from '@/lib/types';
import styles from './page.module.css';

type CartItem = { product: Product; qty: number };

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const next = prev.filter(i => i.product.id !== id);
      localStorage.setItem('cart', JSON.stringify(next));
      return next;
    });
  };

  const total = cart.reduce((sum, i) => sum + Number(i.product.price) * i.qty, 0);

  const handlePay = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const { checkout_url } = await apiPost<CheckoutResponse>('/api/orders', {
        items: cart.map(i => ({ product_id: i.product.id, quantity: i.qty })),
      });
      window.location.href = checkout_url;
    } catch (err) {
      setSubmitting(false);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        throw err;
      }
    }
  };

  if (!mounted || authLoading) return null;

  return (
    <div className={`${styles.page} container`}>
      <h1 className={styles.title}>Checkout</h1>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <p>Your cart is empty.</p>
          <Button href="/shop" style={{ marginTop: 'var(--space-4)' }}>Back to Shop</Button>
        </div>
      ) : (
        <div className={styles.layout}>
          <div className={styles.items}>
            {cart.map(item => (
              <div key={item.product.id} className={styles.item}>
                {item.product.images?.[0] && (
                  <img src={item.product.images[0]} alt={item.product.title} className={styles.itemImg} />
                )}
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.product.title}</p>
                  <p className={styles.itemPrice}>£{Number(item.product.price).toFixed(2)} × {item.qty}</p>
                </div>
                <button className={styles.itemRemove} onClick={() => removeFromCart(item.product.id)}>Remove</button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}><span>Subtotal</span><span>£{total.toFixed(2)}</span></div>
            <div className={styles.summaryRow}><span>Delivery</span><span>{total >= 50 ? 'Free' : '£4.99'}</span></div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>£{(total >= 50 ? total : total + 4.99).toFixed(2)}</span>
            </div>

            {!user ? (
              <div className={styles.loginPrompt}>
                <p>Log in to complete your order.</p>
                <Button href="/login?next=/checkout" style={{ marginTop: 'var(--space-3)' }} fullWidth>Log In</Button>
              </div>
            ) : (
              <>
                <Button onClick={handlePay} disabled={submitting} fullWidth size="lg">
                  {submitting ? 'Redirecting…' : 'Pay with Stripe 💳'}
                </Button>
                {error && <p className={styles.formError}>{error}</p>}
              </>
            )}

            <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
              <Link href="/shop">← Continue shopping</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
