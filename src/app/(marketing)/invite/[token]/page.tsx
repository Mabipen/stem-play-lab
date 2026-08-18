import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import AcceptInviteForm from '@/components/auth/AcceptInviteForm';
import { serverApiGetOrNull } from '@/lib/serverApi';
import styles from '@/components/auth/AuthForm.module.css';

export const metadata: Metadata = {
  title: 'Accept Invite',
  description: 'Accept your invite to the STEM Play Lab admin dashboard.',
};

interface InviteLookup {
  email: string;
  role: 'staff' | 'admin';
  expires_at: string;
}

export default async function AcceptInvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const invite = await serverApiGetOrNull<InviteLookup>(`/api/invites/${token}`);

  return (
    <div className={styles.page}>
      <div className="container">
        {invite ? (
          <>
            <SectionHeader
              eyebrow={`Invited as ${invite.role}`}
              title="Set up your account"
              subtitle={`Create a password for ${invite.email} to join the STEM Play Lab admin dashboard.`}
              titleAs="h1"
            />
            <AcceptInviteForm token={token} />
          </>
        ) : (
          <>
            <SectionHeader
              eyebrow="Invite unavailable"
              title="This invite link is invalid or has expired"
              subtitle="Ask whoever invited you to send a new invite from the Staff & Roles panel."
              titleAs="h1"
            />
            <div style={{ maxWidth: 440, margin: '0 auto', textAlign: 'center' }}>
              <Button href="/login" variant="secondary">Go to Sign In</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
