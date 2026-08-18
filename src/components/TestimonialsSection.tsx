'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'Didsbury, Manchester',
    child: 'Mum of Amara, age 8',
    quote:
      "Amara has done two holiday camps now and absolutely loves it. She came home talking about circuits and asking to build her own robot. The small group sizes mean she actually got personal attention — she'd never been this engaged in learning before.",
    rating: 5,
    initials: 'SM',
    color: '#FF6B35',
  },
  {
    name: 'James T.',
    location: 'Chorlton, Manchester',
    child: 'Dad of Oliver, age 11',
    quote:
      "Oliver is into coding and robotics but schools don't go deep enough. The Coding Ninjas class here is brilliant — he's building actual projects with Python at 11 years old. Worth every penny. Booked him in for the full term.",
    rating: 5,
    initials: 'JT',
    color: '#1B2A5B',
  },
  {
    name: 'Priya K.',
    location: 'Fallowfield, Manchester',
    child: 'Parent of twins aged 6 & 9',
    quote:
      "Both kids go to different sessions which works perfectly. The team remembered every detail about their allergies and preferences from week one. I feel completely safe leaving them there. Booking online was so easy too.",
    rating: 5,
    initials: 'PK',
    color: '#5DCAA5',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(p => (p + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const go = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActive(i);
  };

  return (
    <section className={styles.section} aria-label="Parent testimonials">
      <div className={`${styles.inner} container`}>
        <p className="eyebrow" style={{ textAlign: 'center' }}>What parents say</p>
        <h2 className={styles.title}>Families love STEM Play Lab</h2>

        <div className={styles.slider}>
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              className={`${styles.card} ${i === active ? styles.cardActive : ''}`}
              aria-hidden={i !== active}
            >
              <StarRating rating={t.rating} />
              <blockquote className={styles.quote}>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: t.color }}>{t.initials}</div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorSub}>{t.child} · {t.location}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div className={styles.dots} role="tablist" aria-label="Testimonial navigation">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`View ${t.name}'s testimonial`}
            />
          ))}
        </div>

        {/* Trust badge */}
        <div className={styles.trustBadge}>
          <span className={styles.trustStars}>★★★★★</span>
          <span>Rated <strong>4.9/5</strong> by 200+ Manchester families</span>
        </div>
      </div>
    </section>
  );
}
