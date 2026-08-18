'use client';

import { useState, type FormEvent } from 'react';
import { apiPut, ApiError } from '@/lib/api';
import Button from '@/components/Button';
import formStyles from '@/components/auth/AuthForm.module.css';

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<ApiError | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);
    try {
      await apiPut('/api/password', {
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      });
      setCurrentPassword('');
      setPassword('');
      setPasswordConfirmation('');
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
      {success && <p style={{ color: '#1f6f3f', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>Password updated.</p>}

      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="current_password">Current password</label>
        <input
          id="current_password"
          type="password"
          className={formStyles.input}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        {error?.fieldError('current_password') && <p className={formStyles.fieldError}>{error.fieldError('current_password')}</p>}
      </div>

      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="new_password">New password</label>
        <input
          id="new_password"
          type="password"
          className={formStyles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        {error?.fieldError('password') && <p className={formStyles.fieldError}>{error.fieldError('password')}</p>}
      </div>

      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="new_password_confirmation">Confirm new password</label>
        <input
          id="new_password_confirmation"
          type="password"
          className={formStyles.input}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" disabled={submitting}>{submitting ? 'Updating…' : 'Update Password'}</Button>
    </form>
  );
}
