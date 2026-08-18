'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { apiPost } from '@/lib/api';
import type { User } from '@/lib/types';
import styles from './AdminShell.module.css';

export default function AdminShell({ user, children }: { user: User; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin = user.role === 'admin' || user.role === 'superadmin';

  const navLinks = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/bookings', label: 'Bookings' },
    { href: '/admin/orders', label: 'Orders' },
    ...(isAdmin ? [
      { href: '/admin/products', label: 'Products' },
      { href: '/admin/services', label: 'Services' },
    ] : []),
    ...(user.role === 'superadmin' ? [{ href: '/admin/invites', label: 'Staff & Roles' }] : []),
  ];

  const handleLogout = async () => {
    await apiPost('/api/logout');
    router.push('/login');
    router.refresh();
  };

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.logo} aria-label="STEM Play Lab — Admin">
          <Image src="/logo.svg" alt="STEM Play Lab" width={150} height={50} />
        </Link>
        <span className={styles.badge}>{user.role}</span>

        <ul className={styles.nav} role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.navLink} ${pathname === href ? styles.navLinkActive : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <p className={styles.userName}>{user.name}</p>
          <p className={styles.userRole}>{user.role}</p>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </aside>

      <main id="main-content" className={styles.main}>
        {children}
      </main>
    </div>
  );
}
