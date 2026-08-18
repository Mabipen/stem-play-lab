'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { User } from '@/lib/types';
import Button from '@/components/Button';
import styles from './AuthForm.module.css';

export default function AcceptInviteForm({ token }: { token: string }) {
  const { refresh } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<ApiError | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await apiPost<{ user: User }>(`/api/invites/${token}/accept`, {
        name,
        password,
        password_confirmation: passwordConfirmation,
      });
      await refresh();
      router.push('/admin');
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

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate>
      {error && !error.errors && <p className={styles.formError}>{error.message}</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">Full name</label>
        <input
          id="name"
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
        {error?.fieldError('name') && <p className={styles.fieldError}>{error.fieldError('name')}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        {error?.fieldError('password') && <p className={styles.fieldError}>{error.fieldError('password')}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password_confirmation">Confirm password</label>
        <input
          id="password_confirmation"
          type="password"
          className={styles.input}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? 'Setting up…' : 'Accept Invite & Sign In'}
      </Button>
    </form>
  );
}
