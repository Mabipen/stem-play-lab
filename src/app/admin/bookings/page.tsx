import type { Metadata } from 'next';
import { serverApiGet } from '@/lib/serverApi';
import type { Booking, User } from '@/lib/types';
import BookingsManager from '@/components/admin/BookingsManager';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Bookings — Admin',
  description: 'Manage STEM Play Lab session bookings.',
};

export default async function AdminBookingsPage() {
  const [bookings, user] = await Promise.all([
    serverApiGet<Booking[]>('/api/ops/bookings'),
    serverApiGet<User>('/api/user'),
  ]);

  return (
    <div>
      <h1 className={styles.pageTitle}>Bookings</h1>
      <p className={styles.pageSubtitle}>All session bookings across the business.</p>
      <BookingsManager initialBookings={bookings} canManage={user.role !== 'staff'} />
    </div>
  );
}
