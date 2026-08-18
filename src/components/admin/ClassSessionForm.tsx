'use client';

import { useState, type FormEvent } from 'react';
import { apiPost, apiPut, ApiError } from '@/lib/api';
import type { ClassSession } from '@/lib/types';
import Button from '@/components/Button';
import formStyles from '@/components/auth/AuthForm.module.css';

interface ClassSessionFormProps {
  serviceId: number;
  session?: ClassSession;
  onSaved: () => void;
  onCancel: () => void;
}

function toLocalInputValue(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ClassSessionForm({ serviceId, session, onSaved, onCancel }: ClassSessionFormProps) {
  const [startTime, setStartTime] = useState(session ? toLocalInputValue(session.start_time) : '');
  const [endTime, setEndTime] = useState(session ? toLocalInputValue(session.end_time) : '');
  const [maxCapacity, setMaxCapacity] = useState(String(session?.max_capacity ?? 6));
  const [status, setStatus] = useState<ClassSession['status']>(session?.status ?? 'scheduled');
  const [error, setError] = useState<ApiError | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      service_id: serviceId,
      start_time: startTime,
      end_time: endTime,
      max_capacity: Number(maxCapacity),
      status,
    };

    try {
      if (session) {
        await apiPut(`/api/admin/class-sessions/${session.id}`, payload);
      } else {
        await apiPost('/api/admin/class-sessions', payload);
      }
      onSaved();
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
    <form onSubmit={handleSubmit} noValidate style={{ background: 'var(--color-cream)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)' }}>
      {error && !error.errors && <p className={formStyles.formError}>{error.message}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="start_time">Start time</label>
          <input id="start_time" type="datetime-local" className={formStyles.input} value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          {error?.fieldError('start_time') && <p className={formStyles.fieldError}>{error.fieldError('start_time')}</p>}
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="end_time">End time</label>
          <input id="end_time" type="datetime-local" className={formStyles.input} value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          {error?.fieldError('end_time') && <p className={formStyles.fieldError}>{error.fieldError('end_time')}</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="max_capacity">Max capacity</label>
          <input id="max_capacity" type="number" min="1" className={formStyles.input} value={maxCapacity} onChange={(e) => setMaxCapacity(e.target.value)} required />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="status">Status</label>
          <select id="status" className={formStyles.input} value={status} onChange={(e) => setStatus(e.target.value as ClassSession['status'])}>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : session ? 'Save Changes' : 'Add Session'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
