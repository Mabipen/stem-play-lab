'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { ApiError } from '@/lib/api';
import Button from '@/components/Button';
import styles from './AuthForm.module.css';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const user = await login(email, password, remember);
      const destination = next && next.startsWith('/') ? next : (user.role === 'parent' ? '/account' : '/admin');
      router.push(destination);
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
        <label className={styles.label} htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        {error?.fieldError('email') && <p className={styles.fieldError}>{error.fieldError('email')}</p>}
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
          autoComplete="current-password"
        />
        {error?.fieldError('password') && <p className={styles.fieldError}>{error.fieldError('password')}</p>}
      </div>

      <label className={styles.checkboxRow}>
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
        Keep me signed in
      </label>

      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? 'Signing in…' : 'Sign In'}
      </Button>

      <p className={styles.footerRow}>
        Don&apos;t have an account? <Link href="/register">Register free</Link>
      </p>
    </form>
  );
}
