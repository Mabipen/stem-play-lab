'use client';

import { useState, type FormEvent } from 'react';
import { apiPost, apiPut, ApiError } from '@/lib/api';
import type { Service } from '@/lib/types';
import Button from '@/components/Button';
import formStyles from '@/components/auth/AuthForm.module.css';

interface ServiceFormProps {
  service?: Service;
  onSaved: () => void;
  onCancel: () => void;
}

const TYPES: Service['type'][] = ['class', 'workshop', 'camp', 'party', 'subscription'];

export default function ServiceForm({ service, onSaved, onCancel }: ServiceFormProps) {
  const [title, setTitle] = useState(service?.title ?? '');
  const [slug, setSlug] = useState(service?.slug ?? '');
  const [type, setType] = useState<Service['type']>(service?.type ?? 'class');
  const [planType, setPlanType] = useState<'monthly_kit' | 'membership' | ''>(service?.plan_type ?? '');
  const [description, setDescription] = useState(service?.description ?? '');
  const [basePrice, setBasePrice] = useState(service?.base_price ?? '');
  const [minAge, setMinAge] = useState(service?.min_age != null ? String(service.min_age) : '');
  const [maxAge, setMaxAge] = useState(service?.max_age != null ? String(service.max_age) : '');
  const [isActive, setIsActive] = useState(service?.is_active ?? true);
  const [error, setError] = useState<ApiError | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      title,
      slug,
      type,
      plan_type: type === 'subscription' && planType ? planType : null,
      description: description || null,
      base_price: Number(basePrice),
      min_age: Number(minAge),
      max_age: Number(maxAge),
      is_active: isActive,
    };

    try {
      if (service) {
        await apiPut(`/api/admin/services/${service.id}`, payload);
      } else {
        await apiPost('/api/admin/services', payload);
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
          <label className={formStyles.label} htmlFor="title">Title</label>
          <input id="title" className={formStyles.input} value={title} onChange={(e) => setTitle(e.target.value)} required />
          {error?.fieldError('title') && <p className={formStyles.fieldError}>{error.fieldError('title')}</p>}
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="slug">Slug</label>
          <input id="slug" className={formStyles.input} value={slug} onChange={(e) => setSlug(e.target.value)} required />
          {error?.fieldError('slug') && <p className={formStyles.fieldError}>{error.fieldError('slug')}</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="type">Type</label>
          <select id="type" className={formStyles.input} value={type} onChange={(e) => setType(e.target.value as Service['type'])}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {type === 'subscription' && (
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="plan_type">Plan type</label>
            <select id="plan_type" className={formStyles.input} value={planType} onChange={(e) => setPlanType(e.target.value as 'monthly_kit' | 'membership')}>
              <option value="monthly_kit">Monthly kit</option>
              <option value="membership">Membership</option>
            </select>
          </div>
        )}
      </div>

      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="description">Description</label>
        <textarea id="description" className={formStyles.input} value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="base_price">Price (£)</label>
          <input id="base_price" type="number" step="0.01" min="0" className={formStyles.input} value={basePrice} onChange={(e) => setBasePrice(e.target.value)} required />
          {error?.fieldError('base_price') && <p className={formStyles.fieldError}>{error.fieldError('base_price')}</p>}
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="min_age">Min age</label>
          <input id="min_age" type="number" min="0" className={formStyles.input} value={minAge} onChange={(e) => setMinAge(e.target.value)} required />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="max_age">Max age</label>
          <input id="max_age" type="number" min="0" className={formStyles.input} value={maxAge} onChange={(e) => setMaxAge(e.target.value)} required />
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        Active (visible on the site)
      </label>

      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : service ? 'Save Changes' : 'Add Service'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
