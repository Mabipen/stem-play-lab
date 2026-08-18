import type { Metadata } from 'next';
import { serverApiGet } from '@/lib/serverApi';
import type { Child } from '@/lib/types';
import ChildrenManager from '@/components/account/ChildrenManager';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Child Profiles',
  description: 'Add and manage child profiles — including allergies, medical notes, and emergency contacts.',
};

export default async function ChildrenPage() {
  const children = await serverApiGet<Child[]>('/api/children');

  return (
    <div>
      <h1 className={styles.pageTitle}>Your children</h1>
      <p className={styles.pageSubtitle}>Add child profiles to manage bookings, allergies, medical notes and emergency contacts.</p>
      <ChildrenManager initialChildren={children} />
    </div>
  );
}
