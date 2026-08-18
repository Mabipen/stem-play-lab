import type { Metadata } from 'next';
import { serverApiGet } from '@/lib/serverApi';
import type { Booking } from '@/lib/types';
import BookingsTabs from '@/components/account/BookingsTabs';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Bookings',
  description: 'View your upcoming and past STEM Play Lab session bookings.',
};

export default async function BookingsPage() {
  const bookings = await serverApiGet<Booking[]>('/api/bookings');
  const now = Date.now();

  const upcoming = bookings.filter((b) => b.class_session && new Date(b.class_session.start_time).getTime() > now);
  const past = bookings.filter((b) => !b.class_session || new Date(b.class_session.start_time).getTime() <= now);

  return (
    <div>
      <h1 className={styles.pageTitle}>Bookings</h1>
      <p className={styles.pageSubtitle}>Your upcoming and past session bookings.</p>
      <BookingsTabs upcoming={upcoming} past={past} />
    </div>
  );
}
