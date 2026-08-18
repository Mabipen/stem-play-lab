import type { Metadata } from 'next';
import { serverApiGet } from '@/lib/serverApi';
import type { Order } from '@/lib/types';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Orders',
  description: 'View your Smart Toy Store order history.',
};

const STATUS_BADGE: Record<Order['status'], string> = {
  pending: styles.badgeYellow,
  paid: styles.badgeGreen,
  fulfilled: styles.badgeGreen,
  cancelled: styles.badgeGrey,
  refunded: styles.badgeRed,
};

export default async function OrdersPage() {
  const orders = await serverApiGet<Order[]>('/api/orders');

  return (
    <div>
      <h1 className={styles.pageTitle}>Orders</h1>
      <p className={styles.pageSubtitle}>Your Smart Toy Store order history.</p>

      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyStateIcon}>🛒</span>
          <p>No orders yet.</p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{new Date(order.created_at).toLocaleDateString('en-GB')}</td>
                <td><span className={`${styles.badge} ${STATUS_BADGE[order.status]}`}>{order.status}</span></td>
                <td>£{order.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
