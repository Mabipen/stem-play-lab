'use client';

import { useState } from 'react';
import styles from './LeadCaptureSection.module.css';
import Button from './Button';

const SUBJECTS = ['Science', 'Robotics', 'Coding', 'Engineering', 'Creative Build', 'Not sure yet'];
const AGE_GROUPS = ['Under 4', '4–6 years', '7–9 years', '10–12 years', '13–14 years'];
const SESSION_TYPES = ['Weekly Classes', 'Holiday Camps', 'Birthday Party', 'Build Workshop', 'Kit Subscription', 'School Visit'];

interface FormState {
  name: string; email: string; phone: string; postcode: string;
  childAges: string[]; interests: string[]; sessionTypes: string[]; goals: string;
}

const EMPTY: FormState = { name: '', email: '', phone: '', postcode: '', childAges: [], interests: [], sessionTypes: [], goals: '' };

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

export default function LeadCaptureSection() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof FormState, val: string) => setForm(f => ({ ...f, [key]: val }));
  const toggleArr = (key: 'childAges' | 'interests' | 'sessionTypes', val: string) =>
    setForm(f => ({ ...f, [key]: toggle(f[key], val) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: POST to /api/interest-registrations once endpoint is added
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className={styles.section} aria-label="Register your interest" id="interest-form">
      <div className={`${styles.inner} container`}>

        {/* Left side */}
        <div className={styles.side}>
          <p className="eyebrow">Get early access</p>
          <h2 className={styles.title}>Register your family&apos;s interest</h2>
          <p className={styles.sub}>
            Be the first to hear about new sessions, holiday camps and launch offers. We&apos;ll send you a
            personalised recommendation based on your child&apos;s age and interests.
          </p>

          <div className={styles.benefits}>
            {[
              { icon: '📧', text: 'Priority booking notifications' },
              { icon: '🎁', text: '10% off your first booking' },
              { icon: '📰', text: 'Monthly STEM activity ideas' },
              { icon: '🔔', text: 'Camp & party availability alerts' },
            ].map(b => (
              <div key={b.text} className={styles.benefit}>
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>

          <div className={styles.privacy}>
            🔒 We never share your data. Unsubscribe at any time.
          </div>
        </div>

        {/* Form */}
        <div className={styles.formWrapper}>
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>🎉</div>
              <h3 className={styles.successTitle}>You&apos;re on the list!</h3>
              <p>We&apos;ll be in touch soon with personalised session recommendations for your family.</p>
              <Button href="/services" variant="secondary">Browse sessions now</Button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Parent details */}
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="lc-name" className={styles.label}>Your name *</label>
                  <input
                    id="lc-name" type="text" required className={styles.input}
                    placeholder="Jane Smith"
                    value={form.name} onChange={e => set('name', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="lc-email" className={styles.label}>Email address *</label>
                  <input
                    id="lc-email" type="email" required className={styles.input}
                    placeholder="jane@example.com"
                    value={form.email} onChange={e => set('email', e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="lc-phone" className={styles.label}>Phone number</label>
                  <input
                    id="lc-phone" type="tel" className={styles.input}
                    placeholder="07700 900000"
                    value={form.phone} onChange={e => set('phone', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="lc-postcode" className={styles.label}>Postcode (e.g. M14)</label>
                  <input
                    id="lc-postcode" type="text" className={styles.input}
                    placeholder="M14"
                    value={form.postcode} onChange={e => set('postcode', e.target.value)}
                  />
                </div>
              </div>

              {/* Child ages */}
              <div className={styles.field}>
                <p className={styles.label}>Child age group(s)</p>
                <div className={styles.pills}>
                  {AGE_GROUPS.map(a => (
                    <button key={a} type="button"
                      className={`${styles.pill} ${form.childAges.includes(a) ? styles.pillActive : ''}`}
                      onClick={() => toggleArr('childAges', a)}
                    >{a}</button>
                  ))}
                </div>
              </div>

              {/* Subjects */}
              <div className={styles.field}>
                <p className={styles.label}>Interests (select all that apply)</p>
                <div className={styles.pills}>
                  {SUBJECTS.map(s => (
                    <button key={s} type="button"
                      className={`${styles.pill} ${form.interests.includes(s) ? styles.pillActive : ''}`}
                      onClick={() => toggleArr('interests', s)}
                    >{s}</button>
                  ))}
                </div>
              </div>

              {/* Session types */}
              <div className={styles.field}>
                <p className={styles.label}>Sessions you&apos;re interested in</p>
                <div className={styles.pills}>
                  {SESSION_TYPES.map(t => (
                    <button key={t} type="button"
                      className={`${styles.pill} ${form.sessionTypes.includes(t) ? styles.pillActive : ''}`}
                      onClick={() => toggleArr('sessionTypes', t)}
                    >{t}</button>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div className={styles.field}>
                <label htmlFor="lc-goals" className={styles.label}>Learning goals (optional)</label>
                <textarea
                  id="lc-goals" className={`${styles.input} ${styles.textarea}`} rows={3}
                  placeholder="e.g. Build confidence in maths, prepare for GCSE science, just have fun..."
                  value={form.goals} onChange={e => set('goals', e.target.value)}
                />
              </div>

              <Button type="submit" size="lg" disabled={loading || !form.name || !form.email}>
                {loading ? 'Sending...' : 'Register Interest'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
