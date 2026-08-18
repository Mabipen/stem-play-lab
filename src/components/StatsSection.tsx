'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './StatsSection.module.css';

const STATS = [
  { value: 200, suffix: '+', label: 'Families enrolled' },
  { value: 6, suffix: '', label: 'Children per instructor (max)' },
  { value: 98, suffix: '%', label: 'Parent satisfaction' },
  { value: 6, suffix: '', label: 'STEM subjects covered' },
  { value: 3, suffix: '', label: 'Years of excellence' },
  { value: 4.9, suffix: '/5', label: 'Average parent rating' },
];

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const isDecimal = target % 1 !== 0;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatItem({ stat, active, idx }: { stat: typeof STATS[0]; active: boolean; idx: number }) {
  const count = useCounter(stat.value, 1800, active);
  const display = stat.value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString();
  return (
    <motion.div 
      className={styles.stat}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
    >
      <div className={styles.statValue}>{display}{stat.suffix}</div>
      <div className={styles.statLabel}>{stat.label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.section} aria-label="Our statistics">
      <div className={styles.bg} aria-hidden="true" />
      <div className={`${styles.inner} container`}>
        <p className="eyebrow" style={{ textAlign: 'center', color: 'var(--color-orange)' }}>By the numbers</p>
        <h2 className={styles.title}>Results that speak for themselves</h2>
        <div className={styles.grid}>
          {STATS.map((s, idx) => <StatItem key={s.label} stat={s} active={active} idx={idx} />)}
        </div>
      </div>
    </section>
  );
}
