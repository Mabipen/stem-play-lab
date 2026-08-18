import type { Metadata } from 'next';
import { serverApiGet } from '@/lib/serverApi';
import type { Service } from '@/lib/types';
import ServicesManager from '@/components/admin/ServicesManager';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Services — Admin',
  description: 'Manage bookable services and subscription plans.',
};

export default async function AdminServicesPage() {
  const services = await serverApiGet<Service[]>('/api/admin/services');

  return (
    <div>
      <h1 className={styles.pageTitle}>Services</h1>
      <p className={styles.pageSubtitle}>Classes, camps, parties, workshops and subscription plans.</p>
      <ServicesManager initialServices={services} />
    </div>
  );
}
