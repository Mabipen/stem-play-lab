import type { Metadata } from 'next';
import { serverApiGet } from '@/lib/serverApi';
import type { Order, User } from '@/lib/types';
import OrdersManager from '@/components/admin/OrdersManager';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Orders — Admin',
  description: 'Manage Smart Toy Store orders.',
};

export default async function AdminOrdersPage() {
  const [orders, user] = await Promise.all([
    serverApiGet<Order[]>('/api/ops/orders'),
    serverApiGet<User>('/api/user'),
  ]);

  return (
    <div>
      <h1 className={styles.pageTitle}>Orders</h1>
      <p className={styles.pageSubtitle}>All Smart Toy Store orders.</p>
      <OrdersManager initialOrders={orders} canManage={user.role !== 'staff'} />
    </div>
  );
}
