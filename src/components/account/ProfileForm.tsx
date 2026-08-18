'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { apiPut, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { User } from '@/lib/types';
import Button from '@/components/Button';
import formStyles from '@/components/auth/AuthForm.module.css';

export default function ProfileForm({ user }: { user: User }) {
  const { refresh } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone ?? '');
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);
    try {
      await apiPut('/api/profile', { name, phone: phone || null });
      await refresh();
      router.refresh();
      setSuccess(true);
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
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 420 }}>
      {error && !error.errors && <p className={formStyles.formError}>{error.message}</p>}
      {success && <p style={{ color: '#1f6f3f', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>Profile updated.</p>}

      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="profile_name">Full name</label>
        <input id="profile_name" className={formStyles.input} value={name} onChange={(e) => setName(e.target.value)} required />
        {error?.fieldError('name') && <p className={formStyles.fieldError}>{error.fieldError('name')}</p>}
      </div>

      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="profile_phone">Phone</label>
        <input id="profile_phone" className={formStyles.input} value={phone} onChange={(e) => setPhone(e.target.value)} />
        {error?.fieldError('phone') && <p className={formStyles.fieldError}>{error.fieldError('phone')}</p>}
      </div>

      <div className={formStyles.field}>
        <label className={formStyles.label}>Email</label>
        <input className={formStyles.input} value={user.email} disabled />
      </div>

      <Button type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Save Changes'}</Button>
    </form>
  );
}
