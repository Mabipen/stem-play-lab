import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { serverApiGet } from '@/lib/serverApi';
import type { Invite, Paginated, User } from '@/lib/types';
import InvitesManager from '@/components/admin/InvitesManager';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Staff & Roles',
  description: 'Invite staff and admin users to the STEM Play Lab dashboard.',
};

export default async function InvitesPage() {
  const user = await serverApiGet<User>('/api/user');

  if (user.role !== 'superadmin') {
    redirect('/admin');
  }

  const invites = await serverApiGet<Paginated<Invite>>('/api/superadmin/invites');

  return (
    <div>
      <h1 className={styles.pageTitle}>Staff & roles</h1>
      <p className={styles.pageSubtitle}>Invite people to join as staff or admin. They&apos;ll set their own name and password.</p>
      <InvitesManager initialInvites={invites.data} />
    </div>
  );
}
