import Button from '@/components/Button';
import styles from '../page.module.css';

export default function CheckoutCancelPage() {
  return (
    <div className={`${styles.page} container`}>
      <div className={styles.empty}>
        <h1 className={styles.title}>Checkout cancelled</h1>
        <p>No charge was made. Your cart is still saved if you&apos;d like to try again.</p>
        <Button href="/shop" style={{ marginTop: 'var(--space-5)' }}>Back to Shop</Button>
      </div>
    </div>
  );
}
