import type { Metadata } from 'next';
import Link from 'next/link';
import { serverApiGet } from '@/lib/serverApi';
import type { Booking, Order, Subscription } from '@/lib/types';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your STEM Play Lab family account, bookings, subscriptions and child profiles.',
};

export default async function AccountPage() {
  const [bookings, subscriptions, orders] = await Promise.all([
    serverApiGet<Booking[]>('/api/bookings'),
    serverApiGet<Subscription[]>('/api/subscriptions'),
    serverApiGet<Order[]>('/api/orders'),
  ]);

  const now = Date.now();
  const nextSession = bookings
    .filter((b) => ['reserved', 'confirmed'].includes(b.status) && b.class_session && new Date(b.class_session.start_time).getTime() > now)
    .sort((a, b) => new Date(a.class_session!.start_time).getTime() - new Date(b.class_session!.start_time).getTime())[0];

  const activeMembership = subscriptions.find((s) => s.plan_type === 'membership' && s.status === 'active');
  const recentOrder = orders[0];

  const outstandingBalance = bookings
    .filter((b) => b.payment_status === 'pending')
    .reduce((sum, b) => sum + parseFloat(b.total_amount), 0);

  return (
    <div>
      <h1 className={styles.pageTitle}>Welcome back</h1>
      <p className={styles.pageSubtitle}>Here&apos;s what&apos;s happening with your family account.</p>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <p className={styles.cardLabel}>Next session</p>
          {nextSession && nextSession.class_session ? (
            <>
              <p className={styles.cardValue}>{nextSession.class_session.service?.title ?? 'Session'}</p>
              <p className={styles.cardMeta}>{new Date(nextSession.class_session.start_time).toLocaleString('en-GB')}</p>
            </>
          ) : (
            <>
              <p className={styles.cardValue}>None booked</p>
              <p className={styles.cardMeta}><Link href="/book">Browse sessions →</Link></p>
            </>
          )}
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Active membership</p>
          {activeMembership ? (
            <>
              <p className={styles.cardValue}>Active</p>
              <p className={styles.cardMeta}>Member since {new Date(activeMembership.created_at).toLocaleDateString('en-GB')}</p>
            </>
          ) : (
            <>
              <p className={styles.cardValue}>None</p>
              <p className={styles.cardMeta}><Link href="/memberships">View plans →</Link></p>
            </>
          )}
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Recent order</p>
          {recentOrder ? (
            <>
              <p className={styles.cardValue}>£{recentOrder.total_amount}</p>
              <p className={styles.cardMeta}>{new Date(recentOrder.created_at).toLocaleDateString('en-GB')} · {recentOrder.status}</p>
            </>
          ) : (
            <>
              <p className={styles.cardValue}>No orders yet</p>
              <p className={styles.cardMeta}><Link href="/shop">Visit the store →</Link></p>
            </>
          )}
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Outstanding balance</p>
          <p className={styles.cardValue}>£{outstandingBalance.toFixed(2)}</p>
          <p className={styles.cardMeta}>{outstandingBalance > 0 ? 'Payment pending' : 'All settled up'}</p>
        </div>
      </div>
    </div>
  );
}
