'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost, apiDelete, ApiError } from '@/lib/api';
import type { Invite, InviteStatus } from '@/lib/types';
import Button from '@/components/Button';
import formStyles from '@/components/auth/AuthForm.module.css';
import styles from '@/components/dashboard/DashboardUI.module.css';

const STATUS_BADGE: Record<InviteStatus, string> = {
  pending: styles.badgeYellow,
  accepted: styles.badgeGreen,
  revoked: styles.badgeGrey,
  expired: styles.badgeRed,
};

export default function InvitesManager({ initialInvites }: { initialInvites: Invite[] }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'staff' | 'admin'>('staff');
  const [error, setError] = useState<ApiError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [revokingId, setRevokingId] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await apiPost('/api/superadmin/invites', { email, role });
      setEmail('');
      setRole('staff');
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        throw err;
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRevoke = async (invite: Invite) => {
    if (!confirm(`Revoke the invite for ${invite.email}?`)) return;
    setRevokingId(invite.id);
    try {
      await apiDelete(`/api/superadmin/invites/${invite.id}`);
      router.refresh();
    } finally {
      setRevokingId(null);
    }
  };

  return (
    <div>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>New invite</h2>
        </div>
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className={formStyles.field} style={{ marginBottom: 0, flex: '1 1 240px' }}>
            <label className={formStyles.label} htmlFor="invite_email">Email address</label>
            <input
              id="invite_email"
              type="email"
              className={formStyles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error?.fieldError('email') && <p className={formStyles.fieldError}>{error.fieldError('email')}</p>}
          </div>

          <div className={formStyles.field} style={{ marginBottom: 0 }}>
            <label className={formStyles.label} htmlFor="invite_role">Role</label>
            <select
              id="invite_role"
              className={formStyles.input}
              value={role}
              onChange={(e) => setRole(e.target.value as 'staff' | 'admin')}
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <Button type="submit" disabled={submitting} style={{ marginTop: 'var(--space-6)' }}>
            {submitting ? 'Sending…' : 'Send Invite'}
          </Button>
        </form>
        {error && !error.errors && <p className={formStyles.formError} style={{ marginTop: 'var(--space-4)' }}>{error.message}</p>}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Invites</h2>
        </div>

        {initialInvites.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyStateIcon}>✉️</span>
            <p>No invites sent yet.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Expires</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {initialInvites.map((invite) => (
                <tr key={invite.id}>
                  <td>{invite.email}</td>
                  <td style={{ textTransform: 'capitalize' }}>{invite.role}</td>
                  <td><span className={`${styles.badge} ${STATUS_BADGE[invite.effective_status]}`}>{invite.effective_status}</span></td>
                  <td>{new Date(invite.expires_at).toLocaleDateString('en-GB')}</td>
                  <td>
                    {invite.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRevoke(invite)}
                        disabled={revokingId === invite.id}
                      >
                        {revokingId === invite.id ? 'Revoking…' : 'Revoke'}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
