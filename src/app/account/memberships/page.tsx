import type { Metadata } from 'next';
import { serverApiGet } from '@/lib/serverApi';
import type { Subscription } from '@/lib/types';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Memberships',
  description: 'Manage your STEM Play Lab membership plan.',
};

const STATUS_BADGE: Record<Subscription['status'], string> = {
  active: styles.badgeGreen,
  past_due: styles.badgeYellow,
  unpaid: styles.badgeRed,
  cancelled: styles.badgeGrey,
};

export default async function MembershipsPage() {
  const subscriptions = await serverApiGet<Subscription[]>('/api/subscriptions');
  const memberships = subscriptions.filter((s) => s.plan_type === 'membership');

  return (
    <div>
      <h1 className={styles.pageTitle}>Memberships</h1>
      <p className={styles.pageSubtitle}>Your active and past membership plans.</p>

      {memberships.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyStateIcon}>🎫</span>
          <p>No membership yet.</p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Started</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((m) => (
              <tr key={m.id}>
                <td><span className={`${styles.badge} ${STATUS_BADGE[m.status]}`}>{m.status.replace('_', ' ')}</span></td>
                <td>{new Date(m.created_at).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
