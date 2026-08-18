import type { Metadata } from 'next';
import Link from 'next/link';
import { serverApiGet } from '@/lib/serverApi';
import type { User } from '@/lib/types';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'STEM Play Lab operations dashboard.',
};

export default async function AdminPage() {
  const user = await serverApiGet<User>('/api/user');

  return (
    <div>
      <h1 className={styles.pageTitle}>Welcome, {user.name}</h1>
      <p className={styles.pageSubtitle}>
        Signed in as <strong style={{ textTransform: 'capitalize' }}>{user.role}</strong>.
      </p>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <p className={styles.cardLabel}>Bookings</p>
          <p className={styles.cardValue}>Session bookings</p>
          <p className={styles.cardMeta}><Link href="/admin/bookings">Manage bookings →</Link></p>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Orders</p>
          <p className={styles.cardValue}>Store orders</p>
          <p className={styles.cardMeta}><Link href="/admin/orders">Manage orders →</Link></p>
        </div>

        {(user.role === 'admin' || user.role === 'superadmin') && (
          <>
            <div className={styles.card}>
              <p className={styles.cardLabel}>Catalog</p>
              <p className={styles.cardValue}>Products</p>
              <p className={styles.cardMeta}><Link href="/admin/products">Manage products →</Link></p>
            </div>

            <div className={styles.card}>
              <p className={styles.cardLabel}>Catalog</p>
              <p className={styles.cardValue}>Services & sessions</p>
              <p className={styles.cardMeta}><Link href="/admin/services">Manage services →</Link></p>
            </div>
          </>
        )}

        {user.role === 'superadmin' && (
          <div className={styles.card}>
            <p className={styles.cardLabel}>Staff & roles</p>
            <p className={styles.cardValue}>Manage invites</p>
            <p className={styles.cardMeta}><Link href="/admin/invites">Open Staff & Roles →</Link></p>
          </div>
        )}
      </div>
    </div>
  );
}
