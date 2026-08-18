import { redirect } from 'next/navigation';
import { serverApiGetOrNull } from '@/lib/serverApi';
import type { User } from '@/lib/types';
import AdminShell from '@/components/admin/AdminShell';

const DASHBOARD_ROLES = ['staff', 'admin', 'superadmin'];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverApiGetOrNull<User>('/api/user');

  if (!user) {
    redirect('/login');
  }

  if (!DASHBOARD_ROLES.includes(user.role)) {
    redirect('/account');
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
