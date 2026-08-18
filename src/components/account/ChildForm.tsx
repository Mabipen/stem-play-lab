'use client';

import { useState, type FormEvent } from 'react';
import { apiPost, apiPut, ApiError } from '@/lib/api';
import type { Child } from '@/lib/types';
import Button from '@/components/Button';
import formStyles from '@/components/auth/AuthForm.module.css';

interface ChildFormProps {
  child?: Child;
  onSaved: () => void;
  onCancel: () => void;
}

export default function ChildForm({ child, onSaved, onCancel }: ChildFormProps) {
  const [firstName, setFirstName] = useState(child?.first_name ?? '');
  const [lastName, setLastName] = useState(child?.last_name ?? '');
  const [dateOfBirth, setDateOfBirth] = useState(child?.date_of_birth?.slice(0, 10) ?? '');
  const [allergies, setAllergies] = useState(child?.allergies ?? '');
  const [medicalNotes, setMedicalNotes] = useState(child?.medical_notes ?? '');
  const [emergencyName, setEmergencyName] = useState(child?.emergency_contact_name ?? '');
  const [emergencyPhone, setEmergencyPhone] = useState(child?.emergency_contact_phone ?? '');
  const [error, setError] = useState<ApiError | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      allergies: allergies || null,
      medical_notes: medicalNotes || null,
      emergency_contact_name: emergencyName || null,
      emergency_contact_phone: emergencyPhone || null,
    };

    try {
      if (child) {
        await apiPut(`/api/children/${child.id}`, payload);
      } else {
        await apiPost('/api/children', payload);
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
          <label className={formStyles.label} htmlFor="first_name">First name</label>
          <input id="first_name" className={formStyles.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          {error?.fieldError('first_name') && <p className={formStyles.fieldError}>{error.fieldError('first_name')}</p>}
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="last_name">Last name</label>
          <input id="last_name" className={formStyles.input} value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          {error?.fieldError('last_name') && <p className={formStyles.fieldError}>{error.fieldError('last_name')}</p>}
        </div>
      </div>

      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="date_of_birth">Date of birth</label>
        <input id="date_of_birth" type="date" className={formStyles.input} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        {error?.fieldError('date_of_birth') && <p className={formStyles.fieldError}>{error.fieldError('date_of_birth')}</p>}
      </div>

      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="allergies">Allergies</label>
        <input id="allergies" className={formStyles.input} value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="None" />
      </div>

      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="medical_notes">Medical notes</label>
        <input id="medical_notes" className={formStyles.input} value={medicalNotes} onChange={(e) => setMedicalNotes(e.target.value)} placeholder="None" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="emergency_contact_name">Emergency contact name</label>
          <input id="emergency_contact_name" className={formStyles.input} value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="emergency_contact_phone">Emergency contact phone</label>
          <input id="emergency_contact_phone" className={formStyles.input} value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : child ? 'Save Changes' : 'Add Child'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
