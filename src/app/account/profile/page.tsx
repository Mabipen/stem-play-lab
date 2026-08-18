import type { Metadata } from 'next';
import { serverApiGet } from '@/lib/serverApi';
import type { User } from '@/lib/types';
import ProfileForm from '@/components/account/ProfileForm';
import PasswordForm from '@/components/account/PasswordForm';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Update your parent/guardian profile and password.',
};

export default async function ProfilePage() {
  const user = await serverApiGet<User>('/api/user');

  return (
    <div>
      <h1 className={styles.pageTitle}>Profile</h1>
      <p className={styles.pageSubtitle}>Update your details and password.</p>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your details</h2>
        </div>
        <ProfileForm user={user} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Change password</h2>
        </div>
        <PasswordForm />
      </div>
    </div>
  );
}
