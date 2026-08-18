'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPut } from '@/lib/api';
import type { Order } from '@/lib/types';
import styles from '@/components/dashboard/DashboardUI.module.css';

const STATUS_BADGE: Record<Order['status'], string> = {
  pending: styles.badgeYellow,
  paid: styles.badgeGreen,
  fulfilled: styles.badgeGreen,
  cancelled: styles.badgeGrey,
  refunded: styles.badgeRed,
};

const STATUS_OPTIONS: Order['status'][] = ['pending', 'paid', 'fulfilled', 'cancelled', 'refunded'];

export default function OrdersManager({ initialOrders, canManage }: { initialOrders: Order[]; canManage: boolean }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleStatusChange = async (order: Order, status: Order['status']) => {
    setUpdatingId(order.id);
    try {
      await apiPut(`/api/admin/orders/${order.id}`, { status });
      router.refresh();
    } finally {
      setUpdatingId(null);
    }
  };

  if (initialOrders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyStateIcon}>🛒</span>
        <p>No orders yet.</p>
      </div>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Order</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Date</th>
          <th>Status</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {initialOrders.map((order) => {
          const items = order.orderItems ?? order.order_items ?? [];
          return (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.user?.name ?? '—'}</td>
              <td>{items.map((i) => `${i.product?.title ?? 'Item'} ×${i.quantity}`).join(', ') || '—'}</td>
              <td>{new Date(order.created_at).toLocaleDateString('en-GB')}</td>
              <td>
                {canManage ? (
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value as Order['status'])}
                    disabled={updatingId === order.id}
                    aria-label={`Status for order #${order.id}`}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                ) : (
                  <span className={`${styles.badge} ${STATUS_BADGE[order.status]}`}>{order.status}</span>
                )}
              </td>
              <td>£{order.total_amount}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
