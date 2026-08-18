import Button from '@/components/Button';
import styles from '../../checkout/page.module.css';

export default function BookingSuccessPage() {
  return (
    <div className={`${styles.page} container`}>
      <div className={styles.empty}>
        <h1 className={styles.title}>🎉 Booking confirmed!</h1>
        <p>Thank you for booking with STEM Play Lab. We&apos;ve sent a confirmation email with all the details.</p>
        <Button href="/account/bookings" style={{ marginTop: 'var(--space-5)' }}>View My Bookings</Button>
      </div>
    </div>
  );
}
