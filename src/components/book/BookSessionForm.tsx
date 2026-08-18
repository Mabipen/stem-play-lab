'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { apiGet, apiPost, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { Service, ClassSession, Child, CheckoutResponse } from '@/lib/types';
import styles from './BookSessionForm.module.css';

const TYPE_ICON: Record<string, string> = {
  class: '📅',
  workshop: '🛠️',
  camp: '🏕️',
  party: '🎉',
  subscription: '📦',
};

export default function BookSessionForm() {
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState(1);

  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [service, setService] = useState<Service | null>(null);

  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [session, setSession] = useState<ClassSession | null>(null);

  const [children, setChildren] = useState<Child[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [selectedChildIds, setSelectedChildIds] = useState<number[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<Service[]>('/api/services')
      .then(data => setServices(data.filter(s => s.type !== 'subscription')))
      .finally(() => setLoadingServices(false));
  }, []);

  useEffect(() => {
    if (!service) return;
    setLoadingSessions(true);
    setSession(null);
    apiGet<ClassSession[]>(`/api/class-sessions?service_id=${service.id}`)
      .then(setSessions)
      .finally(() => setLoadingSessions(false));
  }, [service]);

  useEffect(() => {
    if (step !== 3 || !user || children.length > 0) return;
    setLoadingChildren(true);
    apiGet<Child[]>('/api/children')
      .then(setChildren)
      .finally(() => setLoadingChildren(false));
  }, [step, user, children.length]);

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const toggleChild = (id: number) => {
    setSelectedChildIds(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const total = service ? Number(service.base_price) * selectedChildIds.length : 0;

  const handleCheckout = async () => {
    if (!session) return;
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const { checkout_url } = await apiPost<CheckoutResponse>('/api/bookings', {
        class_session_id: session.id,
        child_ids: selectedChildIds,
      });
      window.location.href = checkout_url;
    } catch (err) {
      setIsSubmitting(false);
      if (err instanceof ApiError) {
        setSubmitError(err.message);
      } else {
        throw err;
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <div className={styles.progress}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`${styles.progressStep} ${step >= i ? styles.active : ''}`}>
            {i}
          </div>
        ))}
      </div>

      <div className={styles.formContainer}>
        {step === 1 && (
          <div className={styles.step}>
            <h3 className={styles.stepTitle}>1. What would you like to book?</h3>
            {loadingServices ? (
              <p style={{ textAlign: 'center' }}>Loading options…</p>
            ) : (
              <div className={styles.grid}>
                {services.map(s => (
                  <button
                    key={s.id}
                    className={`${styles.card} ${service?.id === s.id ? styles.selected : ''}`}
                    onClick={() => setService(s)}
                  >
                    <span className={styles.cardIcon}>{TYPE_ICON[s.type] ?? '⭐'}</span>
                    <h4 className={styles.cardTitle}>{s.title}</h4>
                    <p className={styles.cardDesc}>{s.description}</p>
                    <span className={styles.cardPrice}>£{Number(s.base_price).toFixed(2)}</span>
                  </button>
                ))}
              </div>
            )}
            <div className={styles.actions}>
              <Button onClick={nextStep} disabled={!service} size="lg">Continue</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h3 className={styles.stepTitle}>2. Choose a session</h3>
            {loadingSessions ? (
              <p style={{ textAlign: 'center' }}>Loading available sessions…</p>
            ) : sessions.length === 0 ? (
              <p style={{ textAlign: 'center' }}>No upcoming sessions for this option — please check back soon or <Link href="/contact">contact us</Link>.</p>
            ) : (
              <div className={styles.grid}>
                {sessions.map(s => {
                  const full = s.spots_remaining <= 0;
                  return (
                    <button
                      key={s.id}
                      className={`${styles.card} ${session?.id === s.id ? styles.selected : ''}`}
                      onClick={() => !full && setSession(s)}
                      disabled={full}
                      style={full ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                    >
                      <h4 className={styles.cardTitle}>
                        {new Date(s.start_time).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </h4>
                      <p className={styles.cardDesc}>
                        {new Date(s.start_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        {' – '}
                        {new Date(s.end_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <span className={styles.cardPrice}>{full ? 'Fully booked' : `${s.spots_remaining} spot${s.spots_remaining === 1 ? '' : 's'} left`}</span>
                    </button>
                  );
                })}
              </div>
            )}
            <div className={styles.actions}>
              <Button onClick={prevStep} variant="secondary" size="lg">Back</Button>
              <Button onClick={nextStep} disabled={!session} size="lg">Continue</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <h3 className={styles.stepTitle}>3. Who&apos;s coming?</h3>
            {authLoading ? null : !user ? (
              <div className={styles.summary}>
                <p>You&apos;ll need an account to book a session for your child.</p>
                <Button href="/login?next=/book" size="lg">Log In</Button>
              </div>
            ) : loadingChildren ? (
              <p style={{ textAlign: 'center' }}>Loading your children…</p>
            ) : children.length === 0 ? (
              <div className={styles.summary}>
                <p>You haven&apos;t added any child profiles yet.</p>
                <Button href="/account/children" size="lg">Add a Child</Button>
              </div>
            ) : (
              <div className={styles.grid}>
                {children.map(child => (
                  <button
                    key={child.id}
                    className={`${styles.card} ${selectedChildIds.includes(child.id) ? styles.selected : ''}`}
                    onClick={() => toggleChild(child.id)}
                  >
                    <h4 className={styles.cardTitle}>{child.first_name} {child.last_name}</h4>
                    <p className={styles.cardDesc}>Born {new Date(child.date_of_birth).toLocaleDateString('en-GB')}</p>
                  </button>
                ))}
              </div>
            )}
            <div className={styles.actions}>
              <Button onClick={prevStep} variant="secondary" size="lg">Back</Button>
              <Button onClick={nextStep} disabled={selectedChildIds.length === 0} size="lg">Continue</Button>
            </div>
          </div>
        )}

        {step === 4 && service && session && (
          <div className={styles.step}>
            <h3 className={styles.stepTitle}>4. Review & Checkout</h3>
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Session</span>
                <strong>{service.title}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Date &amp; time</span>
                <strong>{new Date(session.start_time).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Children</span>
                <strong>{children.filter(c => selectedChildIds.includes(c.id)).map(c => c.first_name).join(', ')}</strong>
              </div>
              <hr className={styles.divider} />
              <div className={styles.summaryRow}>
                <span>Total Due Today</span>
                <strong className={styles.totalPrice}>£{total.toFixed(2)}</strong>
              </div>
            </div>
            {submitError && <p style={{ textAlign: 'center', color: '#c0392b', marginBottom: 'var(--space-4)' }}>{submitError}</p>}
            <div className={styles.actions}>
              <Button onClick={prevStep} variant="secondary" size="lg">Back</Button>
              <Button onClick={handleCheckout} loading={isSubmitting} size="lg" className={styles.stripeBtn}>
                Checkout with Stripe 💳
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
