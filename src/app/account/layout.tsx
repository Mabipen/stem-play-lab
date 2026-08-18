import { redirect } from 'next/navigation';
import { serverApiGetOrNull } from '@/lib/serverApi';
import type { User } from '@/lib/types';
import AccountShell from '@/components/account/AccountShell';

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverApiGetOrNull<User>('/api/user');

  if (!user) {
    redirect('/login');
  }

  return <AccountShell user={user}>{children}</AccountShell>;
}
