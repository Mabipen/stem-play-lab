'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { ApiError } from '@/lib/api';
import Button from '@/components/Button';
import styles from './AuthForm.module.css';

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<ApiError | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register({
        name,
        email,
        phone: phone || undefined,
        password,
        password_confirmation: passwordConfirmation,
      });
      router.push('/account');
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
        <label className={styles.label} htmlFor="phone">Phone (optional)</label>
        <input
          id="phone"
          type="tel"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />
        {error?.fieldError('phone') && <p className={styles.fieldError}>{error.fieldError('phone')}</p>}
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
        {submitting ? 'Creating account…' : 'Create Account'}
      </Button>

      <p className={styles.footerRow}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </form>
  );
}
