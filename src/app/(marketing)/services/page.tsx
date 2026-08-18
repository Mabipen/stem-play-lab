'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Button from '@/components/Button';
import styles from './page.module.css';

const ALL_SERVICES = [
  { id: 1, type: 'weekly', title: 'Coding Ninjas', subject: 'Coding', subjectPill: 'var(--pill-coding)', age: '7–12', duration: '60 min', price: 18, schedule: 'Saturdays 10:00–11:00', spotsLeft: 2, total: 6 },
  { id: 2, type: 'weekly', title: 'Junior Scientists', subject: 'Science', subjectPill: 'var(--color-yellow)', age: '5–9', duration: '60 min', price: 18, schedule: 'Sundays 11:00–12:00', spotsLeft: 4, total: 6 },
  { id: 3, type: 'weekly', title: 'Robot Builders', subject: 'Robotics', subjectPill: 'var(--pill-robotics)', age: '8–13', duration: '60 min', price: 20, schedule: 'Saturdays 14:00–15:00', spotsLeft: 1, total: 6 },
  { id: 4, type: 'weekly', title: 'Little Engineers', subject: 'Engineering', subjectPill: 'var(--pill-engineering)', age: '4–7', duration: '60 min', price: 16, schedule: 'Wednesdays 15:30–16:30', spotsLeft: 6, total: 6 },
  { id: 5, type: 'weekly', title: 'Creative Makers', subject: 'Creative Build', subjectPill: 'var(--pill-build)', age: '6–11', duration: '60 min', price: 18, schedule: 'Fridays 16:00–17:00', spotsLeft: 3, total: 6 },
  { id: 6, type: 'camp', title: 'Robotics Bootcamp', subject: 'Robotics', subjectPill: 'var(--pill-robotics)', age: '7–13', duration: 'Full day', price: 55, schedule: 'Half-term Oct 2026', spotsLeft: 4, total: 12 },
  { id: 7, type: 'camp', title: 'Code & Create Camp', subject: 'Coding', subjectPill: 'var(--pill-coding)', age: '8–14', duration: 'Full day', price: 55, schedule: 'Half-term Oct 2026', spotsLeft: 6, total: 12 },
  { id: 8, type: 'camp', title: 'Young Scientists Camp', subject: 'Science', subjectPill: 'var(--color-yellow)', age: '5–10', duration: 'Half day', price: 35, schedule: 'Christmas hols 2026', spotsLeft: 8, total: 12 },
  { id: 9, type: 'party', title: 'Robot Builder Party', subject: 'Robotics', subjectPill: 'var(--pill-robotics)', age: '5–11', duration: '2 hours', price: 195, schedule: 'Weekends by request', spotsLeft: 99, total: 99 },
  { id: 10, type: 'party', title: 'Mad Scientist Party', subject: 'Science', subjectPill: 'var(--color-yellow)', age: '4–10', duration: '2 hours', price: 175, schedule: 'Weekends by request', spotsLeft: 99, total: 99 },
  { id: 11, type: 'workshop', title: 'Weekend Build Drop-In', subject: 'Creative Build', subjectPill: 'var(--pill-build)', age: '5–14', duration: '90 min', price: 22, schedule: 'Every other Saturday', spotsLeft: 8, total: 16 },
  { id: 12, type: 'workshop', title: 'Electronics Workshop', subject: 'Engineering', subjectPill: 'var(--pill-engineering)', age: '9–14', duration: '90 min', price: 25, schedule: 'Last Saturday of month', spotsLeft: 5, total: 10 },
  { id: 13, type: 'subscription', title: 'Starter STEM Box', subject: 'Science', subjectPill: 'var(--color-yellow)', age: '4–7', duration: '3 activities/box', price: 19.99, schedule: 'Monthly delivery', spotsLeft: 99, total: 99 },
  { id: 14, type: 'subscription', title: 'Advanced STEM Box', subject: 'Multiple', subjectPill: 'var(--pill-build)', age: '8–12', duration: '4 activities/box', price: 24.99, schedule: 'Monthly delivery', spotsLeft: 99, total: 99 },
];

const FILTER_TYPES = [
  { id: 'all', label: 'All Services' },
  { id: 'weekly', label: 'Weekly Classes' },
  { id: 'camp', label: 'Holiday Camps' },
  { id: 'party', label: 'Birthday Parties' },
  { id: 'workshop', label: 'Build Workshops' },
  { id: 'subscription', label: 'Kit Subscriptions' },
];

const AGE_FILTERS = ['All ages', '3–5', '5–8', '8–12', '12+'];

function spotsColor(left: number, total: number) {
  const pct = left / total;
  if (left === 0) return 'full';
  if (pct <= 0.25) return 'low';
  return 'ok';
}

export default function ServicesPage() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('All ages');
  const [sort, setSort] = useState<'price-asc' | 'price-desc' | 'spots'>('spots');

  const filtered = ALL_SERVICES
    .filter(s => typeFilter === 'all' || s.type === typeFilter)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return a.spotsLeft - b.spotsLeft; // fewest spots first
    });

  return (
    <div className={styles.page}>
      {/* Page hero */}
      <div className={styles.pageHero}>
        <div className="container">
          <p className="eyebrow">What we offer</p>
          <h1 className={styles.heroTitle}>All our STEM sessions & services</h1>
          <p className={styles.heroSub}>
            From weekly classes to birthday parties — book instantly, max 6 per group.
          </p>
        </div>
        <div className={styles.heroWave} aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="var(--color-cream)" /></svg>
        </div>
      </div>

      <div className={`${styles.content} container`}>
        {/* Filter bar */}
        <div className={styles.filterBar}>
          <div className={styles.typeFilters} role="group" aria-label="Filter by type">
            {FILTER_TYPES.map(f => (
              <button
                key={f.id}
                className={`${styles.filterBtn} ${typeFilter === f.id ? styles.filterActive : ''}`}
                onClick={() => setTypeFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={styles.rightFilters}>
            <div className={styles.ageSelect}>
              <label htmlFor="age-filter" className={styles.srOnly}>Filter by age</label>
              <select id="age-filter" className={styles.select} value={ageFilter} onChange={e => setAgeFilter(e.target.value)}>
                {AGE_FILTERS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div className={styles.sortSelect}>
              <label htmlFor="sort" className={styles.srOnly}>Sort</label>
              <select id="sort" className={styles.select} value={sort} onChange={e => setSort(e.target.value as typeof sort)}>
                <option value="spots">Filling fastest</option>
                <option value="price-asc">Price: low–high</option>
                <option value="price-desc">Price: high–low</option>
              </select>
            </div>
          </div>
        </div>

        <p className={styles.resultCount}>{filtered.length} sessions found</p>

        {/* Service cards grid */}
        <div className={styles.grid}>
          {filtered.map(s => {
            const st = spotsColor(s.spotsLeft, s.total);
            const isSubscription = s.type === 'subscription';
            return (
              <article key={s.id} className={styles.card}>
                <div className={styles.cardHead}>

                  <div className={`${styles.spotsBadge} ${styles[`spots_${st}`]}`}>
                    {st === 'full' && '🔴 Full'}
                    {st === 'low' && `🟡 ${s.spotsLeft} spot${s.spotsLeft === 1 ? '' : 's'} left`}
                    {st === 'ok' && (isSubscription ? '🟢 Available' : `🟢 ${s.spotsLeft} spots`)}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.subjectTag}>{s.subject}</span>
                  <h2 className={styles.cardTitle}>{s.title}</h2>
                  <p className={styles.cardSchedule}>{s.schedule}</p>

                  <div className={styles.metaGrid}>
                    <span>Ages {s.age}</span>
                    <span>{s.duration}</span>
                    {!isSubscription && <span>Max 6/group</span>}
                  </div>
                </div>

                <div className={styles.cardFoot}>
                  <div className={styles.price}>
                    {isSubscription ? (
                      <>£{s.price.toFixed(2)}<span className={styles.pricePer}>/month</span></>
                    ) : (
                      <>£{s.price % 1 === 0 ? s.price : s.price.toFixed(2)}<span className={styles.pricePer}>{s.type === 'party' ? ' total' : '/session'}</span></>
                    )}
                  </div>
                  <Button
                    href={st === 'full' ? '/register' : `/book?service=${s.id}`}
                    size="sm"
                    variant={st === 'full' ? 'secondary' : 'primary'}
                    disabled={st === 'full'}
                  >
                    {st === 'full' ? 'Join Waitlist' : isSubscription ? 'Subscribe' : 'Book Now'}
                  </Button>
                </div>

                {/* Capacity bar */}
                {!isSubscription && s.total <= 16 && (
                  <div className={styles.capacityBar}>
                    <div
                      className={styles.capacityFill}
                      style={{ width: `${((s.total - s.spotsLeft) / s.total) * 100}%`, background: st === 'low' ? '#FFB800' : 'var(--color-orange)' }}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No sessions match your filters. <button onClick={() => { setTypeFilter('all'); setAgeFilter('All ages'); }}>Clear filters</button></p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className={styles.bottomCta}>
          <h3>Want something bespoke?</h3>
          <p>We offer school visits, team-building sessions and custom event packages. Get in touch for a quote.</p>
          <Button href="/contact">Get in touch</Button>
        </div>
      </div>
    </div>
  );
}
