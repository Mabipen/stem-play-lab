import Button from '@/components/Button';
import styles from '../../checkout/page.module.css';

export default function BookingCancelPage() {
  return (
    <div className={`${styles.page} container`}>
      <div className={styles.empty}>
        <h1 className={styles.title}>Checkout cancelled</h1>
        <p>No charge was made and your session slot has not been reserved.</p>
        <Button href="/book" style={{ marginTop: 'var(--space-5)' }}>Try Again</Button>
      </div>
    </div>
  );
}
