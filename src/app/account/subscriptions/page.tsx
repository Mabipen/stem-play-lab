import type { Metadata } from 'next';
import { serverApiGet } from '@/lib/serverApi';
import type { Subscription } from '@/lib/types';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'STEM Kit Subscriptions',
  description: 'Manage your STEM Play Lab kit subscription.',
};

const STATUS_BADGE: Record<Subscription['status'], string> = {
  active: styles.badgeGreen,
  past_due: styles.badgeYellow,
  unpaid: styles.badgeRed,
  cancelled: styles.badgeGrey,
};

export default async function SubscriptionsPage() {
  const subscriptions = await serverApiGet<Subscription[]>('/api/subscriptions');
  const kits = subscriptions.filter((s) => s.plan_type === 'monthly_kit');

  return (
    <div>
      <h1 className={styles.pageTitle}>STEM kit subscriptions</h1>
      <p className={styles.pageSubtitle}>Your recurring STEM kit deliveries.</p>

      {kits.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyStateIcon}>📦</span>
          <p>No kit subscription yet.</p>
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
            {kits.map((s) => (
              <tr key={s.id}>
                <td><span className={`${styles.badge} ${STATUS_BADGE[s.status]}`}>{s.status.replace('_', ' ')}</span></td>
                <td>{new Date(s.created_at).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
