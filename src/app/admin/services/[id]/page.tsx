import type { Metadata } from 'next';
import Link from 'next/link';
import { serverApiGet } from '@/lib/serverApi';
import type { ClassSession, Service } from '@/lib/types';
import ClassSessionsManager from '@/components/admin/ClassSessionsManager';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Class Sessions — Admin',
  description: 'Manage class sessions for a service.',
};

export default async function AdminServiceSessionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [services, sessions] = await Promise.all([
    serverApiGet<Service[]>('/api/admin/services'),
    serverApiGet<ClassSession[]>(`/api/ops/class-sessions?service_id=${id}`),
  ]);

  const service = services.find((s) => String(s.id) === id);

  return (
    <div>
      <p><Link href="/admin/services">← All services</Link></p>
      <h1 className={styles.pageTitle}>{service ? `${service.title} — Sessions` : 'Sessions'}</h1>
      <p className={styles.pageSubtitle}>Scheduled class sessions and remaining capacity.</p>
      <ClassSessionsManager serviceId={Number(id)} initialSessions={sessions} />
    </div>
  );
}
