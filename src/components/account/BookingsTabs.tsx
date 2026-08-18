'use client';

import { useState } from 'react';
import type { Booking } from '@/lib/types';
import styles from '@/components/dashboard/DashboardUI.module.css';

const STATUS_BADGE: Record<Booking['status'], string> = {
  reserved: styles.badgeYellow,
  confirmed: styles.badgeGreen,
  completed: styles.badgeGrey,
  cancelled: styles.badgeRed,
};

function BookingsTable({ bookings, emptyMessage }: { bookings: Booking[]; emptyMessage: string }) {
  if (bookings.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyStateIcon}>📅</span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Service</th>
          <th>Date &amp; time</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.class_session?.service?.title ?? '—'}</td>
            <td>{booking.class_session ? new Date(booking.class_session.start_time).toLocaleString('en-GB') : '—'}</td>
            <td><span className={`${styles.badge} ${STATUS_BADGE[booking.status]}`}>{booking.status}</span></td>
            <td>{booking.payment_status}</td>
            <td>£{booking.total_amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function BookingsTabs({ upcoming, past }: { upcoming: Booking[]; past: Booking[] }) {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <div>
      <div className={styles.tabRow}>
        <button
          type="button"
          className={`${styles.tabBtn} ${tab === 'upcoming' ? styles.tabBtnActive : ''}`}
          onClick={() => setTab('upcoming')}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${tab === 'past' ? styles.tabBtnActive : ''}`}
          onClick={() => setTab('past')}
        >
          Past ({past.length})
        </button>
      </div>

      {tab === 'upcoming' ? (
        <BookingsTable bookings={upcoming} emptyMessage="No upcoming sessions booked yet." />
      ) : (
        <BookingsTable bookings={past} emptyMessage="No past sessions yet." />
      )}
    </div>
  );
}
