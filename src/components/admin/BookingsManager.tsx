'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPut } from '@/lib/api';
import type { Booking } from '@/lib/types';
import styles from '@/components/dashboard/DashboardUI.module.css';

const STATUS_BADGE: Record<Booking['status'], string> = {
  reserved: styles.badgeYellow,
  confirmed: styles.badgeGreen,
  completed: styles.badgeGrey,
  cancelled: styles.badgeRed,
};

const STATUS_OPTIONS: Booking['status'][] = ['reserved', 'confirmed', 'cancelled', 'completed'];

export default function BookingsManager({ initialBookings, canManage }: { initialBookings: Booking[]; canManage: boolean }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleStatusChange = async (booking: Booking, status: Booking['status']) => {
    setUpdatingId(booking.id);
    try {
      await apiPut(`/api/admin/bookings/${booking.id}`, { status });
      router.refresh();
    } finally {
      setUpdatingId(null);
    }
  };

  if (initialBookings.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyStateIcon}>📅</span>
        <p>No bookings yet.</p>
      </div>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Parent</th>
          <th>Children</th>
          <th>Session</th>
          <th>Date &amp; time</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {initialBookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.user?.name ?? '—'}</td>
            <td>{booking.bookingItems?.map((item) => item.child?.first_name).filter(Boolean).join(', ') || '—'}</td>
            <td>{booking.class_session?.service?.title ?? '—'}</td>
            <td>{booking.class_session ? new Date(booking.class_session.start_time).toLocaleString('en-GB') : '—'}</td>
            <td>{booking.payment_status}</td>
            <td>
              {canManage ? (
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking, e.target.value as Booking['status'])}
                  disabled={updatingId === booking.id}
                  aria-label={`Status for booking #${booking.id}`}
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              ) : (
                <span className={`${styles.badge} ${STATUS_BADGE[booking.status]}`}>{booking.status}</span>
              )}
            </td>
            <td>£{booking.total_amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
