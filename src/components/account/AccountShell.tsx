'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { apiPost } from '@/lib/api';
import type { User } from '@/lib/types';
import styles from './AccountShell.module.css';

const NAV_LINKS = [
  { href: '/account', label: 'Overview' },
  { href: '/account/children', label: 'Children' },
  { href: '/account/bookings', label: 'Bookings' },
  { href: '/account/memberships', label: 'Memberships' },
  { href: '/account/subscriptions', label: 'Subscriptions' },
  { href: '/account/orders', label: 'Orders' },
  { href: '/account/profile', label: 'Profile' },
];

export default function AccountShell({ user, children }: { user: User; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await apiPost('/api/logout');
    router.push('/login');
    router.refresh();
  };

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo} aria-label="STEM Play Lab — Home">
          <Image src="/logo.svg" alt="STEM Play Lab" width={160} height={54} />
        </Link>

        <ul className={styles.nav} role="list">
          {NAV_LINKS.map(({ href, label }) => (
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
