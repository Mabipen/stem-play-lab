'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import styles from './HowItWorksSection.module.css';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const STEPS = [
  {
    num: '01',
    title: 'Choose a Session',
    desc: 'Browse our full schedule of weekly classes, holiday camps, build workshops, birthday parties, and kit subscriptions.',
    color: 'var(--color-orange)',
  },
  {
    num: '02',
    title: 'Book Your Spot',
    desc: 'Reserve in seconds. We hold spots for 10 minutes during checkout — no double-booking, ever. Max 6 children per class.',
    color: '#B2F5A0',
  },
  {
    num: '03',
    title: 'Show Up & Explore',
    desc: 'Arrive at our Manchester lab and let our DBS-checked instructors guide your child through something extraordinary.',
    color: '#B2DFFF',
  },
];

export default function HowItWorksSection() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('/science-animation.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.log('Lottie load error:', err));
  }, []);

  return (
    <section className={styles.section} aria-label="How it works">
      <div className={styles.bg} aria-hidden="true" />
      <div className={`${styles.inner} container`}>
        <motion.div 
          className={styles.headerWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerText}>
            <p className="eyebrow" style={{ textAlign: 'center' }}>Simple & transparent</p>
            <h2 className={styles.title}>How it works</h2>
            <p className={styles.subtitle}>
              Booking a STEM session for your child takes less than 2 minutes.
            </p>
          </div>
          <div className={styles.lottieWrapper}>
            {animationData ? (
              <Lottie animationData={animationData} loop={true} />
            ) : (
              <div className={styles.lottiePlaceholder} />
            )}
          </div>
        </motion.div>

        <div className={styles.steps}>
          {STEPS.map((step, idx) => (
            <motion.div 
              key={step.num} 
              className={styles.stepWrapper}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className={styles.step}>
                <div className={styles.stepNum} style={{ background: step.color }}>
                  {step.num}
                </div>

                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>

              {/* Connector arrow */}
              {idx < STEPS.length - 1 && (
                <div className={styles.connector} aria-hidden="true">→</div>
              )}
            </motion.div>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="/book" className={styles.ctaBtn}>Book Now — it&apos;s free to try →</a>
        </div>
      </div>
    </section>
  );
}
